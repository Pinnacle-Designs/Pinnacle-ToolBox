declare module "spark-md5" {
  interface SparkMD5Static {
    hash(str: string, raw?: boolean): string;
    ArrayBuffer: {
      hash(arr: ArrayBuffer, raw?: boolean): string;
    };
  }
  const SparkMD5: SparkMD5Static;
  export default SparkMD5;
}
