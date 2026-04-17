import { memo } from 'react';
import { Trans } from 'react-i18next';

interface PropsModel {
  translationKey: string;
  replace?: Record<string, string>;
}

export const AdvancedTranslation = memo((props: PropsModel) => {
  return (
    <Trans
      i18nKey={props.translationKey}
      values={props.replace}
      components={{ italic: <i />, bold: <strong />, br: <br /> }}
    />
  );
});

AdvancedTranslation.displayName = 'AdvancedTranslation';
