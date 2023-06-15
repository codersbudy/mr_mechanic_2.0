 export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,16}$');

 export const validContact=new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

 export const validName=new RegExp(/^[A-Za-z ]+$/);

 export const validUsername=new RegExp('/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;');

 export const validOtp=new RegExp('[0-9]');
