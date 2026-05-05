import { newsItemType } from "./newsItem";
import { projectType } from "./project";
import { serviceType } from "./service";
import { testimonialType } from "./testimonial";

export const schemaTypes = [newsItemType, projectType, serviceType, testimonialType];
export const schema = { types: schemaTypes };
