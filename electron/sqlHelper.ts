import { connect, get, run } from "./sqlite3";

/**
 * 链接sqlite3数据库
 * @param path 
 */
export const connectDataBase = async (path: string) => {
  await connect(path);
}

/**
 * 通过url查找数据库记录
 * @param url
 */
export const findRecord = async (url: string) => {
  const record = await get(
    `select * from ParsingVideo s where s.Path = ? and s.Env = ?`,
    [url, import.meta.env.MODE]
  );
  return record;
};

/**
 * 插入数据库记录
 * @param data
 */
export const insertRecord = async (data: any) => {
  const insertSql = `insert into ParsingVideo (Id, Title, Path, SourceSubtitles, TargetSubtitles, CreateTime, LocationVideoPath, FolderDate, Env, HasVtt) 
                     values ($Id, $Title, $Path, $SourceSubtitles, $TargetSubtitles, $CreateTime, $LocationVideoPath, $FolderDate, $Env, $HasVtt)`;
  return await run(insertSql, data);
};