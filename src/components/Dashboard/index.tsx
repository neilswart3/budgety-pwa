// import { Account, Category, Occasion, Saving, Transaction } from '@/core';
import { Stack } from '@chakra-ui/react';
// import Case from 'case';
// import { InputField, SelectField, SelectFieldType } from '../ui';

export const Dashboard: React.FC = () => {
  //   const modelInputTypes = {
  //     Account: Account.inputTypes,
  //     Category: Category.inputTypes,
  //     Occasion: Occasion.inputTypes,
  //     Saving: Saving.inputTypes,
  //     Transaction: Transaction.inputTypes,
  //   };

  return (
    <Stack>
      {/* <Stack gap={8}>
        {Object.entries(modelInputTypes).map(([model, inputTypes]) => (
          <Stack key={model}>
            <Heading>{model}</Heading>
            <Stack>
              {Object.entries(inputTypes).map(([name, type]) => (
                <div key={`${model}-${name}`}>
                  {(() => {
                    if (['select', 'multiSelect'].includes(type)) {
                      return (
                        <SelectField
                          name={name}
                          type={type as SelectFieldType}
                          value=""
                          options={Array.from({ length: 20 }).map((_, i) => {
                            const value = `${model}-${name}-${i + 1}`;
                            return { value, label: Case.title(value) };
                          })}
                          label={
                            <HStack>
                              {Case.title(name)} - <pre>{type}</pre>
                            </HStack>
                          }
                        />
                      );
                    }

                    return (
                      <InputField
                        name={name}
                        type={type}
                        value=""
                        label={
                          <HStack>
                            {Case.title(name)} - <pre>{type}</pre>
                          </HStack>
                        }
                      />
                    );
                  })()}
                </div>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack> */}
    </Stack>
  );
};
