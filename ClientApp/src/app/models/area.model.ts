// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

export class Area {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, areaCode?: string, areaDesc?: string) {

    this.id = id;
    this.areaCode = areaCode;
    this.areaDesc = areaDesc;
  }

  public id: string;
  public areaCode: string;
  public areaDesc: string;
}
