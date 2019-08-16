
module.exports = {
  stringSanitizier: function(notSanitized){
    return notSanitized.toString().replace(/[\'\>\<\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

}
