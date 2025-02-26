import { DataSource, DataSourceConfig } from '../data-source';
import { Passport } from '../../domain/contexts/iam/passport';
import { AzMaps } from '../../../../seedwork/services-seedwork-maps-az';
import { AppContext } from '../../init/app-context-builder';

export class MapsDataSource<Context extends AppContext> extends DataSource<Context> {
  private _maps: AzMaps;

  constructor(options: DataSourceConfig<Context>) {
    super(options);
    this._maps = new AzMaps();
  }
  
  public get context(): Context { return this._context;}

  public async withMaps(func:(passport:Passport, maps:AzMaps) => Promise<void>): Promise<void> {
    let passport =  this.context.passport; 
    await func(passport, this._maps);
  }
}