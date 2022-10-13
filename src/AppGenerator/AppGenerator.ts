import { Generator, chalk } from '@umijs/utils';
import { join } from 'path';

interface AppGeneratorProp {
  version: string;
  name: string;
  tpl: 'web' | 'component' | 'mobile';
}

export default class AppGenerator extends Generator {
  async writing() {
    const asgs = this.args;
    const props = asgs.props as AppGeneratorProp;

    const hump = function(str: string) {
      const re = /-(\w)/g;
      const s = str.replace(re, function($0, $1) {
        return $1.toUpperCase();
      });
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    this.copyDirectory({
      context: {
        name: props.name,
        BigHumpName: hump(props.name),
        version: props.version,
        version: require('../../package').version,
      },
      path: join(__dirname, `../templates/${props.tpl}`),
      target: this.cwd,
    });
  }
}
