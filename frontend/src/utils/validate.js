const validate = (payload, setInvalidField) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalid++;

      setInvalidField((prev) => [
        ...prev,
        { name: arr[0], mes: "Required this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    let regex = "";
    switch (arr[0]) {
      case "email":
          regex =
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!arr[1].match(regex)) {
          invalid++;
          setInvalidField((prev) => [
            ...prev,
            { name: arr[0], mes: "Email invalid!" },
          ]);
        }
        break;
      case "password":
        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!arr[1].match(regex)) {
          invalid++;
          setInvalidField((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password must: <br/>Be a minium of 8 characters <br/> Include at least one lowercase letter <br/> Include at least one uppercase letter <br/> Include at least one number",
            },
          ]);
        }
        break;
      default:
        break;
    }
  }
  return invalid;
};

export default validate;
