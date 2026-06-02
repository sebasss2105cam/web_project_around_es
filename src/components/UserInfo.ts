export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor({
    nameSelector,
    jobSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
  }) {
    this._nameElement = document.querySelector(
      nameSelector
    ) as HTMLElement;

    this._jobElement = document.querySelector(
      jobSelector
    ) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent || "",
      job: this._jobElement.textContent || "",
    };
  }

  public setUserInfo(data: UserData): void {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}