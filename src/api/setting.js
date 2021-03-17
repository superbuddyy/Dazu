import Resource from '@/api/resource';

class SettingResource extends Resource {
  constructor() {
    super('admin/settings');
  }
}

export { SettingResource as default };
