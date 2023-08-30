export default class Validation {

  success: boolean;
  message: string;

  /**
   * Create a new validation object 
   * @param sucess If the validation was successful
   * @param message the validation message, if validate failed
   */
  constructor (sucess: boolean = true, message: string = ""){

    this.success = sucess;
    this.message = message
  }
}