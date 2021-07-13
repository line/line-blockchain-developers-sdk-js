import _ from "lodash";

const EMPTY = "";
export class RequestBodyFlattener {
  static flatten(requestBody = {}) {
    const objBody = _.cloneDeep(requestBody)
    const flatPair = {}     // we're going to convert objBody to flatPair
    Object.keys(objBody).forEach(key => {
      const value = objBody[key]
      if (Array.isArray(value)) {
        // scan for all sub-keys
        let allSubKeys = []
        value.forEach(elem => {
          allSubKeys = _.union(allSubKeys, Object.keys(elem))
        })

        // now we have keys for elements. fill-in flatPair
        value.forEach(elem => { // for each element on the array
          allSubKeys.forEach(subKey => {
            const flatKey = `${key}.${subKey}`
            const flatRawValue = elem[subKey] ? elem[subKey] : EMPTY
            const prevFlatValue = flatPair[flatKey]
            flatPair[flatKey] =
              _.isUndefined(prevFlatValue) ? flatRawValue : `${prevFlatValue},${flatRawValue}`
          })
        })
      } else {
        flatPair[key] = objBody[key]
      }
    });
    const flattenBody = Object.keys(flatPair).sort().map(key => `${key}=${flatPair[key]}`).join('&')
    return flattenBody;
  }
}
