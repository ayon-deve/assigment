import { Document } from 'mongoose';
export interface ICognitoUser extends Document {
  readonly username: string;
//   readonly cognito_user_id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
//   readonly phone_trimmed: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
//   readonly yourself: string;
  // readonly gender: string;
  readonly status: number;
  readonly created_on: number;
  readonly last_login_time: number;
  readonly password: number;
  readonly image: object;
  
//   readonly user_type: string;
//   readonly agent_code: string;
//   readonly updated_at: number;

//   readonly access_token_data: object;

//   readonly id_token_data: object;
//   readonly refresh_token_data: object;
//   readonly confirm_password: string;
//   readonly address: string;

//   readonly has_betoparedes_access: number;
//   readonly last_cron_modified: number;

//   readonly direct_contract_send_access: number;

//   readonly direct_access_given_by: string;
//   readonly calendar_id: string;
//   readonly is_rep_contract_signed: number
//   readonly is_w9_form_signed: number
  
}
