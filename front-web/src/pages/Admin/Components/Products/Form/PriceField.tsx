import { Controller, Control } from "react-hook-form"
import CurrencyInput from 'react-currency-input-field';
import { FormState } from './index';

type Props = {
    control:Control<FormState>
}

const PriceField = ({ control }: Props) => {
    return (
        <div>
            <Controller
                name="price"
                defaultValue=""
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ value, onChange }) => (
                    <CurrencyInput
                        className="form-control input-base"
                        placeholder="Preço"
                        value={value}
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        onValueChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default PriceField;