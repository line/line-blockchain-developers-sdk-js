"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBodyFlattener = void 0;
const lodash_1 = __importDefault(require("lodash"));
const EMPTY = "";
class RequestBodyFlattener {
    static flatten(requestBody = {}) {
        const objBody = lodash_1.default.cloneDeep(requestBody);
        const flatPair = {}; // we're going to convert objBody to flatPair
        Object.keys(objBody).forEach(key => {
            const value = objBody[key];
            if (Array.isArray(value)) {
                // scan for all sub-keys
                let allSubKeys = [];
                value.forEach(elem => {
                    allSubKeys = lodash_1.default.union(allSubKeys, Object.keys(elem));
                });
                // now we have keys for elements. fill-in flatPair
                value.forEach(elem => {
                    allSubKeys.forEach(subKey => {
                        const flatKey = `${key}.${subKey}`;
                        const flatRawValue = elem[subKey] ? elem[subKey] : EMPTY;
                        const prevFlatValue = flatPair[flatKey];
                        flatPair[flatKey] =
                            lodash_1.default.isUndefined(prevFlatValue) ? flatRawValue : `${prevFlatValue},${flatRawValue}`;
                    });
                });
            }
            else {
                flatPair[key] = objBody[key];
            }
        });
        return Object.keys(flatPair).sort().map(key => `${key}=${flatPair[key]}`).join('&');
    }
}
exports.RequestBodyFlattener = RequestBodyFlattener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1ib2R5LWZsYXR0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZXF1ZXN0LWJvZHktZmxhdHRlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUF1QjtBQUV2QixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBYSxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsRUFBRTtRQUM3QixNQUFNLE9BQU8sR0FBRyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUEsQ0FBSyw2Q0FBNkM7UUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsd0JBQXdCO2dCQUN4QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUE7Z0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLFVBQVUsR0FBRyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2dCQUNyRCxDQUFDLENBQUMsQ0FBQTtnQkFFRixrREFBa0Q7Z0JBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQzFCLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO3dCQUNsQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO3dCQUN4RCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7d0JBQ3ZDLFFBQVEsQ0FBQyxPQUFPLENBQUM7NEJBQ2YsZ0JBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLElBQUksWUFBWSxFQUFFLENBQUE7b0JBQ3BGLENBQUMsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQyxDQUFBO2FBQ0g7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Q0FDRjtBQTlCRCxvREE4QkMifQ==