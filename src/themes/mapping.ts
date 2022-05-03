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
            backgroundColor: '#c4c4c4'
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
                labelColor: 'color-basic-800',
                backgroundColor: 'background-basic-color-2',
                borderColor: 'background-basic-color-2',

                state: {
                  focused: {
                    borderColor: 'background-basic-color-2',
                    backgroundColor: 'background-basic-color-2'
                  }
                }
              }
            },
            size: {
              large: {
                borderRadius: 6,
                borderWidth: 0
              }
            }
          }
        }
      }
    }
  }
}
