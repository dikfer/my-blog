import CMS from "netlify-cms"
import ImageGalleryWidget from "./image-gallery-widget.js"
import ImageGalleryPreview from "./image-gallery-preview.js"
import { ru } from 'netlify-cms-locales';

CMS.registerLocale('ru', ru);
/**
 * Register the imported widget:
 */
CMS.registerWidget(`image-gallery`, ImageGalleryWidget, ImageGalleryPreview)