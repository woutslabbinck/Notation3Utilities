import * as fs from 'fs';
import { spawn } from 'node:child_process';
import { fileSync } from "tmp";
import { Reasoner } from "./Reasoner";

/**
 * A reasoner implementing the command line EYE
 * See also https://github.com/eyereasoner/eye
 */
export class EyeReasoner extends Reasoner {
  private eye: string;
  private args: string[];

  /**
   * Constructor
   * @param eye - The path to the eye reasoner
   * @param args - Default startup parameters
   */
  constructor(eye: string, args: string[]) {
    super();
    this.eye = eye;
    this.args = args;
  }

  /**
   * Run the reasoner
   * @returns An N3 string containing the result of the inferences
   */
  public async run(data: string[], rules: string[]): Promise<string> {
    const tmpobj = fileSync();
    fs.appendFileSync(tmpobj.name, data);
    fs.appendFileSync(tmpobj.name, rules);


    const all_args = this.args.concat(tmpobj.name);

    return new Promise<string>(async (resolve, reject) => {
      let errorData = '';
      let resultData = '';

      const ls = spawn(this.eye, all_args, { shell: process.platform === 'win32' });
      ls.stdout.on('data', (data) => {
        resultData += data;
      });
      ls.stderr.on('data', (data) => {
        errorData += data;
      });
      ls.on('close', (code) => {
        if (code != 0) {
          tmpobj.removeCallback();
          return reject(errorData);
        }
        else {
          tmpobj.removeCallback();
          return resolve(resultData);
        }
      });
    });
  }
}
