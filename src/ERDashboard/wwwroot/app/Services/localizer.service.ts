import { Injectable } from '@angular/core';
import { En } from '../Localizers/en';
import { Ja } from '../Localizers/ja';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Injectable()
export class LocalizerService {
  private dataAttrb: string = "data-localize";
  public res;
    private response;

    constructor(private http: Http) {
        let self = this;

    }

     
    
  //  Returns a resource with name localizationKey and
  public get(): Promise<any> {
        return this.http.get("api/utils").toPromise()
            .then((res: Response) => {
                if (res == null)
                    throw "No resource object passed to Localizer!";
                else if (res.text() === "en")
                    this.res = new En();
                else
                    this.res = new Ja();
                return this.res;
            })
  };

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