import fs from 'mz/fs';
import path from 'path';

/**
 * @typedef { object } FileInfo
 * @property { string } name
 * @property { boolean } isDirectory
 * @property { boolean } isLink
 * @property { number } size
 * @property { Date } atime
 * @property { Date } birthtime
 * @property { Date } mtime
 * @property { Date } ctime
 */

export default {
  /**
   * @returns { Promise<FileInfo[]> }
   */
  ls: async dir => Promise.all((await fs.readdir(dir).catch(e => { throw e; })).map(async f => {
    const fp = path.join(dir, f);
    const stat = await fs.lstat(fp);
    const isSymbolicLink = stat.isSymbolicLink();
    let isDirectory = stat.isDirectory();
    if (isSymbolicLink) {
      const linkStat = await fs.stat(fp).catch(() => null);
      isDirectory = linkStat && linkStat.isDirectory() || isDirectory;
    }
    return {
      name: f,
      isDirectory,
      isLink: isSymbolicLink,
      size: stat.size,
      atime: stat.atime,
      birthtime: stat.birthtime,
      mtime: stat.mtime,
      ctime: stat.ctime
    };
  }))
};
