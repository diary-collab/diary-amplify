import DatePicker from '@src/components/forms/date-picker';
import Input from '@src/components/forms/default-input';
import PasswordInput from '@src/components/forms/password-input';
import SearchableSelectInput from '@src/components/forms/searchable-select-input';

export const Components = {
  email: Input,
  text: Input,
  password: PasswordInput,
  date: DatePicker,
  enum: SearchableSelectInput,
};
