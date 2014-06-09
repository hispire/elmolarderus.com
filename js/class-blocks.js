/**
 * Hash to save the name of the CSS classes
 * assigned to an array with a easy handled name
 * to be use in the HTML template as 
 * blocks.{array name}
 */


var blocks = {
  'island--small': [
    'spacer__padding-right--size-small',
    'spacer__padding-left--size-small',
    'spacer__padding-top--size-small',
    'spacer__padding-bottom--size-small',
  ],
  'island--large': [
    'spacer__padding-right--size-large',
    'spacer__padding-left--size-large',
    'spacer__padding-top--size-large',
    'spacer__padding-bottom--size-large',
  ],  
  'table__container': [
    'l',
    'l-col--9-of-12',
    'l-col--3-of-12-sm', 
    'l--align-center'
  ],
  'table': [
    'l-grid--align-center', 
    'spacer__margin-bottom--size-large',
    'l-col--12-of-12',
    'container__box-shadow--intensity-loud', 
    'table-text'
  ],
  'table__head': [
    'background__color--primary-default',
  ],
  'table__body': [
    'background__color--primary-mod-soft',
  ],
  'table__col': [
    'spacer__padding-top--size-medium', 
    'spacer__padding-bottom--size-medium', 
  ],
  'text-area--neutral': [
    'l--align-center', 
    'foreground__color--neutral-loud', 
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],
  'text-area--neutral-soft': [
    'l--align-center', 
    'foreground__color--neutral-soft', 
    'reading-text'
  ],


  'text-area--primary': [
    'l--align-center', 
    'foreground__color--primary-loud', 
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],
  'text-area--primary-soft': [
    'l--align-center', 
    'foreground__color--primary-soft', 
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],

  'text-area--secondary': [
    'l--align-center', 
    'foreground__color--secondary-loud',
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],
  'text-area--secondary-soft': [
    'l--align-center', 
    'foreground__color--secondary-soft',
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],

  'text-area--tertiary': [
    'l--align-center', 
    'foreground__color--tertiary-loud', 
    'spacer__margin-bottom--size-large',
    'reading-text'
  ],
  'media__figure--large': [
    'l', 
    'l-col--4-of-12', 
    'l-col--3-of-12-sm', 
    'l-self--align-middle'  
  ],
  'media__figure--xxlarge': [
    'l', 
    'l-col--10-of-12', 
    'l-col--7-of-12-sm', 
    'l-self--align-middle'  
  ],

  'figure__info': [
    'l-col--12-of-12', 
    'catalog__text',
    'background__color--secondary-mod-soft'
    //'foreground__bg--secondary-loud' 
  ],
  'media__content--large': [
    'l', 
    'l-col--12-of-12', 
    'l-col--9-of-12-sm',
    'l--last-sm', 
    'l-self--align-middle',
  ],
  'media__content--xxlarge': [
    'l', 
    'l-col--12-of-12', 
    'l-col--5-of-12-sm',
    'l--last-sm', 
    'l-self--align-middle',
  ],

  'content__features': [
    'catalog__text'
  ],
  'list-vertical--no-style': [
    'list--no-style',
    'spacer__margin-bottom--size-large'
  ],
  'catalog__item': [
    'l',
    'l-col--10-of-12',
    'l-col--5-of-12-sm',
    'l-col--3-of-12-md',
    'l--align-center',
    'container__border-radius--size-medium',  
    'background__color--neutral-mod-soft',
    'container__box-shadow--intensity-very-loud',
    'spacer__margin-bottom--size-xxlarge'
  ],
  'gallery__item': [
    'l',
    'l-col--10-of-12',
    'l-col--5-of-12-sm',
    'l-col--3-of-12-md',
    'l--align-center',
    'l--last',
    'spacer__margin-bottom--size-large'
  ],

  'item--circle-shadow': [
    'container__border-radius--style-circle',
    'background__color--secondary-mod-soft',  
    'container__box-shadow--intensity-very-loud',
  ],
  'gallery--polaroid': [
    'l',
    'list--no-style',
    'l-col--11-of-12',
    'l--align-center',
    'polaroid'
  ],
  'button--rounded': [
    'l',
    'container__border-radius--size-medium',
    'container__box-shadow--intensity-very-loud',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xlarge',
    'button',
    'l-self--relative'  
  ],
  'icon--left': [
    'spacer__padding-top--size-xsmall',
    'spacer__padding-left--size-xsmall',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'icon--left',
    'container__border-radius--left'  
  ],
  'container--circle-shadow': [
    'l',
    'spacer__padding-top--size-small',
    'spacer__padding-left--size-small',
    'spacer__padding-bottom--size-small',
    'spacer__padding-right--size-small',
    'container__border-radius--style-circle',
    'container__box-shadow--intensity-very-loud',
  ],

  'container--rounded': [
    'l',
    'container__border-radius--size-medium',
    'container__box-shadow--intensity-very-loud',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall',
  ],
  'container--rounded-xxpadded': [
    'l',
    'container__border-radius--size-medium',
    'container__box-shadow--intensity-very-loud',
    'spacer__padding-bottom--size-medium',
    'spacer__padding-top--size-medium',
    'spacer__padding-right--size-medium',
    'spacer__padding-left--size-medium',
  ],
  'container--rounded-xpadded': [
    'l',
    'container__border-radius--size-medium',
    'container__box-shadow--intensity-very-loud',
    'spacer__padding-bottom--size-small',
    'spacer__padding-top--size-small',
    'spacer__padding-right--size-small',
    'spacer__padding-left--size-small',
  ],


  'container--rounded-error': [
    'background__color--flash-alert',
    'foreground--error',  
    'container__border-radius--size-small',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall',
    'spacer__margin-bottom--size-small'
  ],
  'container--rounded-success': [
    'background__color--flash-success',
    'foreground--success',  
    'container__border-radius--size-small',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall',
    'spacer__margin-bottom--size-small'
  ], 
  'container--rounded-flash': [
    'background__color--flash-default',
    'container__border-radius--size-small',
    'container__box-shadow--intensity-very-loud',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall',
    'spacer__margin-bottom--size-small'
  ],

  'form__input--rounded': [
    'background__color--neutral-very-soft',
    'container__border-radius--size-small',
    'container__border--size-xsmall',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall',
    'spacer__margin-bottom--size-large'
  ],
  'form__submit--rounded': [
    'container__border-radius--size-small',
    'spacer__padding-bottom--size-xsmall',
    'spacer__padding-top--size-xsmall',
    'spacer__padding-right--size-xsmall',
    'spacer__padding-left--size-xsmall'
  ]

}; 

module.exports.blocks = blocks
