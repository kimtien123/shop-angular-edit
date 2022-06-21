export class Category {

  constructor(
    public id: number = 1,
    public date: string = new Date().toISOString().split('T')[0],
    public name: string = '',
    public description: string = '',
  ) {}
}
