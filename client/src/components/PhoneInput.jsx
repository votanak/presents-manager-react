import InputMask from 'react-input-mask';

export const PhoneInput = (props) => {
  const classVar = `${props.isInvalid ? 'is-invalid' : ''} form-control`;
  return (
    <InputMask
      id={props.id}
      className={classVar}
      mask="+7(999)999-99-99"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={props.name}
    ></InputMask>
  );
};
