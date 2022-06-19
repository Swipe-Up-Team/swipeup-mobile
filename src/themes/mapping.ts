/* eslint-disable import/no-extraneous-dependencies */
import { CustomSchemaType } from '@eva-design/dss'

export const customMapping: CustomSchemaType = {
  components: {
    Divider: {
      meta: {
        scope: 'all',
        parameters: {},
        appearances: {},
        variantGroups: {},
        states: {}
      },
      appearances: {
        filled: {
          mapping: {
            backgroundColor: 'color-basic-400'
          },
          variantGroups: {}
        }
      }
    },
    Button: {
      meta: {
        scope: 'all',
        parameters: {},
        appearances: {},
        variantGroups: {},
        states: {}
      },
      appearances: {
        filled: {
          mapping: {},
          variantGroups: {
            size: {
              large: {
                borderRadius: 6,
                textFontWeight: '600'
              }
            },
            status: {
              primary: {
                state: {
                  disabled: {
                    backgroundColor: 'color-primary-500',
                    textColor: '#fff'
                  }
                }
              }
            }
          }
        }
      }
    },
    Input: {
      meta: {
        scope: 'all',
        parameters: {},
        appearances: {},
        variantGroups: {},
        states: {}
      },
      appearances: {
        default: {
          mapping: {
            labelFontSize: 14,
            labelFontWeight: '400'
          },
          variantGroups: {
            status: {
              basic: {
                labelColor: 'text-basic-color',
                borderColor: 'background-basic-color-2'
              },
              primary: {
                labelColor: 'text-basic-color'
              },
              success: {
                labelColor: 'text-basic-color'
              },
              info: {
                labelColor: 'text-basic-color'
              },
              warning: {
                labelColor: 'text-basic-color'
              },
              danger: {
                labelColor: 'text-basic-color'
              }
            },
            size: {
              large: {
                borderRadius: 6
              }
            }
          }
        }
      }
    }
  }
}
