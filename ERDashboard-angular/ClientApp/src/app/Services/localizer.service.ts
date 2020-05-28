import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Injectable()
export class LocalizerService {
    private dataAttrb: string = "data-localize";
    public res;
    private response;

    constructor(private http: HttpClient) {
        let self = this;

    }

    //  Returns a resource with name localizationKey and
    public get() {
        return this.http.get("api/utils");
    }

    //  Date/Time formatting methods
    public longDateFormat(dateItem) {
        if (this.res.longDateFormat) {
            return this.res.longDateFormat(dateItem);
        }
        else {
            return $.ig.formatter(dateItem, "date",
                $.ig.regional.defaults.dateLongPattern + ' ' +
                $.ig.regional.defaults.timeLongPattern);
        }
    }

    public shortDateFormat(dateItem) {
        if (this.res.shortDateFormat) {
            return this.res.shortDateFormat(dateItem);
        }
        else {
            return $.ig.formatter(dateItem, "date", $.ig.regional.defaults.datePattern);
        }
    }
    //Returns date in format "dd MMM yyyy"
    public mainViewDateFormat(dateItem) {
        //This parsing is needed for iPad issue when trying to format date string
        var item = new Date(Date.parse(dateItem));
        return $.ig.formatter(item, "date", "dd MMM yyyy");
    }

    public xrayImageViewDateFormat(dateItem) {
        //This parsing is needed for iPad issue when trying to format date string
        var item = new Date(Date.parse(dateItem));
        return $.ig.formatter(item, "date", this.get()["xrayDatePattern"]);
    }

    //  Finds all DOM elements with attribute data-localize set and
    //  applies the corresponding localization item to the element
    public localizeView(view) {
        var viewResources = this.res[view];
        // Get all HTML elements that have a resource key.
        $('[' + this.dataAttrb + ']').each(function () {
            // Get the resource key from the element.
            var resKey = $(this).attr(this.dataAttrb);
            if (resKey) {
                // Get all the window.resources that start with the key.
                var resValue = viewResources[resKey];
                if (resKey.indexOf('.') == -1) {
                    // No dot notation in resource key,
                    // assign the resource value to the element's
                    // innerHTML.
                    $(this).html(resValue);
                }
                else {
                    // Dot notation in resource key, assign the
                    // resource value to the element's property
                    // whose name corresponds to the substring
                    // after the dot.
                    var attrKey = resKey.substring(resKey.indexOf('.') + 1);
                    $(this).attr(attrKey, resValue);
                }
            }
        });
    };
}
