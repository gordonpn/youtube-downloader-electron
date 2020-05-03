const validateLinks = link => {
  return new Promise((resolve, reject) => {
    const re = new RegExp(
      '^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$'
    );
    const match = re.exec(link);
    if (match) {
      const response = {
        message: `${link} is valid`,
        link,
        id: match[5],
      };
      resolve(response);
    } else {
      const reason = new Error(`${link} is not valid`);
      reject(reason);
    }
  });
};

module.exports.validateLinks = validateLinks;
