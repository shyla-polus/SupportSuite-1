# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

  // Method to get data from server
  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  // Method to post data to server
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/data`, data);
  }


    // Method to get data from server
  getData() {
    this.sharedService.getData().subscribe({
      next: response => {
        console.log('Data fetched successfully', response);
      },
      error: err => {
        console.error('Error fetching data', err);
      }
    });
  }

  // Method to post data to server
  postData(data: any) {
    this.sharedService.postData(data).subscribe({
      next: response => {
        console.log('Data posted successfully', response);
      },
      error: err => {
        console.error('Error posting data', err);
      }
    });
  }
logo
<img width="800" height="223" src="https://www.polussolutions.com/wp-content/uploads/2023/09/logo-1024x285.webp" class="attachment-large size-large wp-image-1563" alt="" srcset="https://www.polussolutions.com/wp-content/uploads/2023/09/logo-1024x285.webp 1024w, https://www.polussolutions.com/wp-content/uploads/2023/09/logo-300x84.webp 300w, https://www.polussolutions.com/wp-content/uploads/2023/09/logo-768x214.webp 768w, https://www.polussolutions.com/wp-content/uploads/2023/09/logo-1536x428.webp 1536w, https://www.polussolutions.com/wp-content/uploads/2023/09/logo-2048x571.webp 2048w" sizes="(max-width: 800px) 100vw, 800px">

  design
  <sbw-snippet _nghost-serverapp-c119=""><sbpro-page-header _ngcontent-serverapp-c119="" headerclasses="bg-yellow page-header-ui-dark" bordertype="angled" borderclasses="text-white" _nghost-serverapp-c34=""><header _ngcontent-serverapp-c34="" class="page-header-ui bg-yellow page-header-ui-dark"><div _ngcontent-serverapp-c119="" class="page-header-ui-content pb-4" style="height: auto !important;"><div _ngcontent-serverapp-c119="" class="container"><div _ngcontent-serverapp-c119="" class="row align-items-center"><div _ngcontent-serverapp-c119="" class="col-lg-8 mb-4 mb-lg-0"><h1 _ngcontent-serverapp-c119="" class="page-header-ui-title">Bootstrap Navbar with Logo Image</h1><p _ngcontent-serverapp-c119="" class="page-header-ui-text mb-0">Bootstrap Navbar Example with Logo Image</p></div><div _ngcontent-serverapp-c119="" class="col-lg-4"><div _ngcontent-serverapp-c119="" adsense="" class="carbon-container" style="height: auto !important;"><ins _ngcontent-serverapp-c119="" class="adsbygoogle" data-ad-client="ca-pub-5287323383309901" data-ad-format="auto" data-full-width-responsi="=&quot;tru" style="display: block; height: 280px;" data-adsbygoogle-status="done" data-ad-status="filled"><div id="aswift_1_host" style="border: none; height: 280px; width: 356px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-block; overflow: visible;"><iframe id="aswift_1" name="aswift_1" browsingtopics="true" style="left:0;position:absolute;top:0;border:0;width:356px;height:280px;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" width="356" height="280" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allow="attribution-reporting" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-5287323383309901&amp;output=html&amp;h=280&amp;adk=3781616413&amp;adf=2284595112&amp;w=356&amp;abgtt=6&amp;fwrn=4&amp;fwrnh=100&amp;lmt=1720499552&amp;rafmt=1&amp;format=356x280&amp;url=https%3A%2F%2Fstartbootstrap.com%2Fsnippets%2Fnavbar-logo&amp;fwr=0&amp;rpe=1&amp;resp_fmts=3&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTI2LjAuMjU5Mi44NyIsbnVsbCwwLG51bGwsIjY0IixbWyJOb3QvQSlCcmFuZCIsIjguMC4wLjAiXSxbIkNocm9taXVtIiwiMTI2LjAuNjQ3OC4xMjciXSxbIk1pY3Jvc29mdCBFZGdlIiwiMTI2LjAuMjU5Mi44NyJdXSwwXQ..&amp;dt=1720499552413&amp;bpp=4&amp;bdt=683&amp;idt=-M&amp;shv=r20240702&amp;mjsv=m202407030101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie_enabled=1&amp;eoidce=1&amp;prev_fmts=0x0&amp;nras=1&amp;correlator=1472001339082&amp;rume=1&amp;frm=20&amp;pv=1&amp;ga_vid=690761886.1720499552&amp;ga_sid=1720499552&amp;ga_hid=1151001833&amp;ga_fc=0&amp;u_tz=330&amp;u_his=2&amp;u_h=768&amp;u_w=1366&amp;u_ah=720&amp;u_aw=1366&amp;u_cd=24&amp;u_sd=1&amp;dmc=8&amp;adx=874&amp;ady=141&amp;biw=1343&amp;bih=646&amp;scr_x=0&amp;scr_y=0&amp;eid=44759876%2C44759927%2C44759837%2C31084867%2C42531705%2C44795922%2C95330413%2C95331695%2C95334510%2C95334526%2C95334579%2C31084187%2C31061691%2C31061693%2C31078663%2C31078668%2C31078670&amp;oid=2&amp;pvsid=2230091983515679&amp;tmod=71951525&amp;wsm=1&amp;uas=0&amp;nvt=1&amp;ref=https%3A%2F%2Fwww.bing.com%2F&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1366%2C0%2C1366%2C720%2C1358%2C646&amp;vis=1&amp;rsz=%7C%7CeE%7C&amp;abl=CS&amp;pfx=0&amp;fu=128&amp;bc=31&amp;bz=1.01&amp;psd=W251bGwsbnVsbCxudWxsLDNd&amp;nt=1&amp;ifi=2&amp;uci=a!2&amp;fsb=1&amp;dtd=10" data-google-container-id="a!2" tabindex="0" title="Advertisement" aria-label="Advertisement" data-google-query-id="CIaMuJmQmYcDFdfocwEdbfMDng" data-load-complete="true"></iframe></div></ins></div></div></div></div></div><sbpro-border _ngcontent-serverapp-c34="" _nghost-serverapp-c24=""><!----><!----><div _ngcontent-serverapp-c24="" class="svg-border-angled text-white"><svg _ngcontent-serverApp-c24="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon _ngcontent-serverApp-c24="" points="0,100 100,0 100,100"></polygon></svg></div><!----></sbpro-border></header></sbpro-page-header><sbpro-page-section _ngcontent-serverapp-c119="" sectionclasses="py-5" bordertype="angled" borderclasses="text-light" _nghost-serverapp-c35=""><section _ngcontent-serverapp-c35="" class="py-5" style="height: auto !important;"><div _ngcontent-serverapp-c119="" class="container" style="height: auto !important;"><div _ngcontent-serverapp-c119="" class="mb-3"><span _ngcontent-serverapp-c119="" class="badge bg-secondary text-dark">Bootstrap 5.1.0</span></div><div _ngcontent-serverapp-c119="" class="mb-4 rounded shadow snippet"><iframe _ngcontent-serverapp-c119="" width="100%" height="700" allowfullscreen="" allowpaymentrequest="allowpaymentrequest" frameborder="0" src="//jsfiddle.net/StartBootstrap/jm1sLd6f/embedded/result,html,css,js,resources"></iframe></div><div _ngcontent-serverapp-c119="" class="row" style="height: auto !important;"><div _ngcontent-serverapp-c119="" class="col-lg-8" style="height: auto !important;"><div _ngcontent-serverapp-c119="" class="native-standard"><ins _ngcontent-serverapp-c119="" class="adsbygoogle" data-ad-client="ca-pub-5287323383309901" data-ad-format="auto" data-full-width-responsi="=&quot;tru" data-ad-slot="3689627054" style="display: block; height: 0px;" data-adsbygoogle-status="done" data-ad-status="unfilled"><div id="aswift_2_host" style="border: none; height: 0px; width: 736px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-block; overflow: hidden; opacity: 0;"><iframe id="aswift_2" name="aswift_2" browsingtopics="true" style="left: 0px; position: absolute; top: 0px; border: 0px; width: 736px; height: 0px;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" width="736" height="0" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allow="attribution-reporting" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-5287323383309901&amp;output=html&amp;h=280&amp;slotname=3689627054&amp;adk=1286660224&amp;adf=1078556116&amp;pi=t.ma~as.3689627054&amp;w=736&amp;abgtt=6&amp;fwrn=4&amp;fwrnh=100&amp;lmt=1720499552&amp;rafmt=1&amp;format=736x280&amp;url=https%3A%2F%2Fstartbootstrap.com%2Fsnippets%2Fnavbar-logo&amp;fwr=0&amp;rpe=1&amp;resp_fmts=3&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTI2LjAuMjU5Mi44NyIsbnVsbCwwLG51bGwsIjY0IixbWyJOb3QvQSlCcmFuZCIsIjguMC4wLjAiXSxbIkNocm9taXVtIiwiMTI2LjAuNjQ3OC4xMjciXSxbIk1pY3Jvc29mdCBFZGdlIiwiMTI2LjAuMjU5Mi44NyJdXSwwXQ..&amp;dt=1720499552413&amp;bpp=1&amp;bdt=683&amp;idt=1&amp;shv=r20240702&amp;mjsv=m202407030101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie_enabled=1&amp;eoidce=1&amp;prev_fmts=0x0%2C356x280&amp;nras=1&amp;correlator=1472001339082&amp;rume=1&amp;frm=20&amp;pv=1&amp;ga_vid=690761886.1720499552&amp;ga_sid=1720499552&amp;ga_hid=1151001833&amp;ga_fc=0&amp;u_tz=330&amp;u_his=2&amp;u_h=768&amp;u_w=1366&amp;u_ah=720&amp;u_aw=1366&amp;u_cd=24&amp;u_sd=1&amp;dmc=8&amp;adx=114&amp;ady=1337&amp;biw=1343&amp;bih=646&amp;scr_x=0&amp;scr_y=0&amp;eid=44759876%2C44759927%2C44759837%2C31084867%2C42531705%2C44795922%2C95330413%2C95331695%2C95334510%2C95334526%2C95334579%2C31084187%2C31061691%2C31061693%2C31078663%2C31078668%2C31078670&amp;oid=2&amp;pvsid=2230091983515679&amp;tmod=71951525&amp;wsm=1&amp;uas=0&amp;nvt=1&amp;ref=https%3A%2F%2Fwww.bing.com%2F&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1366%2C0%2C1366%2C720%2C1358%2C646&amp;vis=1&amp;rsz=%7C%7CeEbr%7C&amp;abl=CS&amp;pfx=0&amp;fu=128&amp;bc=31&amp;bz=1.01&amp;psd=W251bGwsbnVsbCxudWxsLDNd&amp;nt=1&amp;ifi=3&amp;uci=a!3&amp;btvi=1&amp;fsb=1&amp;dtd=27" data-google-container-id="a!3" tabindex="0" title="Advertisement" aria-label="Advertisement" data-google-query-id="CKqauZmQmYcDFUWt2AUdKY0M7A" data-load-complete="true"></iframe></div></ins></div><div _ngcontent-serverapp-c119="" class="card"><div _ngcontent-serverapp-c119="" class="card-body"><sbw-disqus _ngcontent-serverapp-c119="" _nghost-serverapp-c26=""><div _ngcontent-serverapp-c26="" class="disqus-comments"><div _ngcontent-serverapp-c26="" id="disqus_thread"><iframe id="dsq-app323" name="dsq-app323" allowtransparency="true" frameborder="0" scrolling="no" tabindex="0" title="Disqus" width="100%" src="https://disqus.com/embed/comments/?base=default&amp;f=startbootstrap&amp;t_i=%2Fsnippets%2Fnavbar-logo&amp;t_u=https%3A%2F%2Fstartbootstrap.com%2Fsnippets%2Fnavbar-logo%2F&amp;t_d=Bootstrap%20Navbar%20Brand%20Logo%20Example&amp;t_t=Bootstrap%20Navbar%20Brand%20Logo%20Example&amp;s_o=default#version=6c27b7b2e58aef7c0a19eb6da9bdf7b0" style="width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 2610px !important;" horizontalscrolling="no" verticalscrolling="no"></iframe></div><noscript _ngcontent-serverapp-c26="">Please enable JavaScript to view the <a _ngcontent-serverapp-c26="" href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript></div></sbw-disqus></div></div></div><div _ngcontent-serverapp-c119="" class="col-lg-4"><div _ngcontent-serverapp-c119="" class="card"><div _ngcontent-serverapp-c119="" class="card-body"><h5 _ngcontent-serverapp-c119="">Need more UI elements?</h5><p _ngcontent-serverapp-c119="" class="small">Try SB UI Kit Pro, which is packed with custom view, pages, and components to help you get started on your next project!</p><a _ngcontent-serverapp-c119="" routerlink="/theme/sb-ui-kit-pro" class="btn btn-primary fw-500" href="/theme/sb-ui-kit-pro">Preview SB UI Kit Pro</a></div></div></div></div></div><sbpro-border _ngcontent-serverapp-c35="" _nghost-serverapp-c24=""><!----><!----><div _ngcontent-serverapp-c24="" class="svg-border-angled text-light"><svg _ngcontent-serverApp-c24="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon _ngcontent-serverApp-c24="" points="0,100 100,0 100,100"></polygon></svg></div><!----></sbpro-border></section></sbpro-page-section></sbw-snippet>