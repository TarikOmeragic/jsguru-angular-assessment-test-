export class Url {
  
    private pathh: Array<unknown> = [];
    private paramss: Map<string, any> = new Map<string, any>();
    private arrayParamss: { [name: string]: (string | number)[] } = {};
  
    public push(...part: (string | number)[]): Url {
      this.path.push(...part);
      return this;
    }
  
    public put(key: string, val: any): Url {
      if (Array.isArray(val)) {
        return this.putArray(key, val);
      }
      this.paramss.set(key, val);
      return this;
    }
  
    public putArray(key: string, val: (string | number)[]): Url {
      this.arrayParamss[key] = val;
      return this;
    }
  
    public get arrayParams(): { [name: string]: (string | number)[] } {
      return this.arrayParamss;
    }
  
    public get path(): Array<unknown> {
      return this.pathh;
    }
  
    public set path(value: Array<unknown>) {
      this.pathh = value;
    }
  
    public get params(): Map<string, any> {
      return this.paramss;
    }
  
    public serialize(): string {
      const ret: string = this.path.join('/');
      let count = 0;
      const param: string[] = Array.from(this.params.entries()).map(
        (value: [string, any]) => {
          count++;
          return (
            encodeURIComponent(value[0]) + '=' + encodeURIComponent(value[1])
          );
        }
      );
      let acount = 0;
      const aparam: any = [];
      Object.keys(this.arrayParams).forEach((key) => {
        const arr: (string | number)[] = this.arrayParams[key];
        aparam.push(
          ...arr.map((value: any) => {
            acount++;
            return encodeURIComponent(key) + '[]=' + encodeURIComponent(value);
          })
        );
      });
  
      /* we don't' use params any more, we will use HTTP client option for that */
      return ret + (count + acount ? '?' + aparam.concat(param).join('&') : '');
    }
  }
  