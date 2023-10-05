import Image from 'next/image';
import workshop from 'public/images/bio/gaboesquivel-workshop.jpg';
import blockchaincr from 'public/images/2018/06/blockchain-costa-rica.jpg';

export default function BioPage() {
  return (
    <section>
    <div id="portfolio">

   <div className="project">
    <a target="_blank" href="http://www.eatarcade.com/"><img src="/images/work/eatarcade.jpg" /></a>
    <div className="project-details">
      <h2>Eat Arcade</h2>
      <p>Sms subscription system to hand-curated dishes from the best restaurants in New York City.</p>
      <ul>
         <li>Admin Panel for order management</li>
         <li>Intergration with Twilio API</li>
         <li>Mobile website</li>
         <li>Authentication and permissions</li>
         <li>Billing system ( Integration with Stripe )</li>
      </ul>
      <p>NodeJS, Express.js, AngularJS, MongoDB, Heroku, Bootstrap, Stripe, Twilio</p>

    </div>
  </div>

  <div className="project">
    <a target="_blank" href="http://www.jockeyhollowbarandkitchen.com/"><img src="/images/work/jockey-hollow.png" /></a>
    <div className="project-details">
      <h2>Jockey Hollow Bar and Kitchen</h2>
      <p>Responsive Website</p>
      <ul>
        <li>UI Development</li>
        <li>Google Docs as Backend</li>
        <li>Caching Server with MEAN stack</li>
      </ul>
      <p>SASS, jQuery, Lodash, Grapnel.js, Grunt, Node(Express), Heroku, Divshot</p>
    </div>
  </div>

  <div className="project">
    <a target="_blank" href="#"><img src="/images/work/jockey-hollow-menu.png" /></a>
    <div className="project-details">
      <h2>Jockey Hollow Bar and Kitchen</h2>
      <p>Menu Kiosk App</p>
      <ul>
        <li>UI Development</li>
        <li>Google Docs as Backend</li>
        <li>Caching Server with MEAN stack</li>
      </ul>
      <p>SASS, jQuery, Lodash, Grapnel.js, Grunt, Node(Express), Heroku, Divshot</p>
    </div>
  </div>

	<div className="project">
		<a target="_blank" href="http://elderscrollsonline.com"><img src="/images/work/elder-scrolls.jpg" /></a>
		<div className="project-details">
			<h2>Elder Scrolls Online</h2>
			<p>Official website providing news, media, a game guide and community forums.</p>
			<ul>
				<li>UI Development</li>
				<li>Integration with social media</li>
				<li>HTML5 video player and forums</li>
			</ul>
			<p>HTML5, PHP, jQuery, Facebook API, Twitter API</p>
		</div>
	</div>


	<div className="project">
		<a target="_blank" href="http://yeahtv.com"><img src="/images/work/facebook-app-yeah-tv.jpg" /></a>
		<div className="project-details">
			<h2>Yeah TV Facebook App</h2>
			<p>An online movie streaming service where you can watch movies dissected in chapters with detailed information and interactive games.</p>
			<ul>
			   <li>Front-End Technical Lead</li>
			   <li>Javascript Architecture</li>
			   <li>Integration with Brigthcove</li>
			   <li>Chapter navigation and interactive games</li>
			</ul>
			<p>HTML5, PHP, Facebook API, AJAX, Facebook Credits, Handlebars, Brightcove API, require.js</p>
		</div>
	</div>

	<div className="project">
		<a target="_blank" href="https://www.americanexpress.com/"><img src="/images/work/amex.jpg" /></a>
		<div className="project-details">
			<h2>American Express</h2>
			<p>AMEX official website </p>
			<ul>
			   <li>Special Modules : Card Details, Ratings and Reviews, Taskbar (Saved Cards), Card Comparison</li>
			   <li>Accessibility: tabbing navigation and screen readers</li>
			   <li>Migration from Dojo to jQuery</li>
			</ul>
			<p>JSP(Struts), Omniture, Abobe mBox, Facebook API, jQuery, CSS3</p>
		</div>
	</div>

	<div className="project">
		<a target="_blank" href="http://tikr.com"><img src="/images/work/tikr.jpg" /></a>
		<div className="project-details">
			<h2>Tikr</h2>
			<p>Interactive Online Store with fluctuating prices</p>
			<ul>
				<li>User Interface</li>
				<li>Database</li>
				<li>Spree Integration</li>
			</ul>
			<p>Ruby on Rails, Spree, Heroku, Postgres, jQuery, SASS/SCSS</p>
		</div>
	</div>

	<div className="project">
		<a href='http://bureauoftrade.com'><img src="/images/work/bureau-of-trade-beta.jpg" /></a>
		<div className="project-details">
			<h2>Bureau of Trade (Beta)</h2>
			<p>Online Store</p>
			<ul>
			   <li>Integration with eBay</li>
			   <li>Wordpress AJAX</li>
			   <li>UI - CSS3 effects</li>
			</ul>
			<p>PHP, eBay API, HTML5, AJAX/jQuery</p>
		</div>
	</div>

  <div className="project">
   <img src="/images/work/arinc.png" />
   <div className="project-details">
     <h2>ARINC Microfids</h2>
     <p>microFIDS is a flight information display system for hotels, rental car agencies and airport related businesses that offers flexible sizes and revenue opportunities.</p>
     <ul>
        <li>User Interface with Flexible Layout</li>
     </ul>
     <p>Ruby on Rails, AngularJS, Faye, LESS, Heroku</p>
   </div>
 </div>


	<div className="project">
		<a href='http://www.gridium.com/products/portfolio-manager/'><img src="/images/work/gridium.png" /></a>
		<div className="project-details">
			<h2>Gridium</h2>
			<p>Energy data analytics prototype</p>

			<ul>
			   <li>UI with Twitter Bootstrap</li>
			   <li>Data Tables</li>
			   <li>Data Charts</li>
			</ul>
			<p>Javascript, Data Charts, CSS</p>
		</div>
	</div>


	<div className="project">
		<a href='http://www.amigosdelosparques.org/orchid-partner.php'><img src="/images/work/proparques.jpg" /></a>
		<div className="project-details">
			<h2>Orchid Parterns</h2>
			<p>Website for the membership program created by ProParques</p>
			<ul>
			   <li>Created a interactive map displaying partners location</li>
			   <li>Management system for the interactive map and partners information</li>
			   <li>Integration with their Joomla CMS</li>
			</ul>
			<p>PHP, Joomla, MySQL, CSS, Google Maps</p>
		</div>
	</div>

	<div className="project">
		<img src="/images/work/scotiatico.jpg" />
		<div className="project-details">
			<h2>Scotiabank Newsletter</h2>
			<p>Scotiabank´s intranet newsletter</p>
			<ul>
			   <li>Design and implementation of a custom CMS</li>
			   <li>Gallery Module: Multiple file uploading and resizing</li>
			   <li>User authentication and roles manager</li>
				<li>HTML Export Module: newsletter can be exported to plain html</li>
			</ul>
			<p>PHP, MySQL, CSS, Javascript</p>
		</div>
	</div>


	<div className="project">
		<a href='http://costaricabedfinder.com'><img src="/images/work/costa-rica-bedfinder.jpg" /></a>
		<div className="project-details">
			<h2>Costa Rica Bedfinder</h2>
			<p>Vacation rentals directory</p>
			<ul>
			   <li>Redesign of search and filter UI</li>
			   <li>Performance Optimization</li>
			   <li>Onsite SEO</li>
			   <li>AJAX search</li>
			</ul>
			<p>PHP(cakePHP), MySQL, jQuery</p>
		</div>
	</div>

	<div className="project">
		<a href='http://newsroom.suntrust.com/2010-05-26-SunTrust-Invites-You-to-Say-Thank-You-to-the-Heroes-in-Your-Life-with-Solid-Salutes-Personalized-Video'><img src="/images/work/suntrust-1.jpg" /></a>
		<div className="project-details">
			<h2>Suntrust</h2>
			<p>Solid Salutes Website</p>
			<ul>
				<li>Presentation Layer</li>
				<li>Image Cropping with jQuery Crop</li>
				<li>Video Player</li>
			</ul>
			<p>JSP, CSS, Javascript, jQuery Crop</p>
		</div>
	</div>



	<div className="project">
		<img src="/images/work/nummux.jpg" />
		<div className="project-details">
			<h2>NUMMUX</h2>
			<p>Unique online and on the ground sales force multiplier for small to medium enterprises.</p>
			<ul>
			   <li>User Interface</li>
			   <li>Integration with Java BackEnd</li>
			</ul>
			<p>JSP, Struts, jQuery</p>
		</div>
	</div>


	<div className="project">
		<a target="_blank" href="http://fantasytennis.me"><img src="/images/work/fantasy-tennis.jpg" /></a>
		<div className="project-details">
			<h2>Fantasy Tennis</h2>
			<p>Online Game</p>
			<ul>
				<li>Admin Panel with ActiveAdmin</li>
				<li>Data Sync with Infostrada API</li>
				<li>JSON API with Ruby on Rails</li>
				<li>Authentication and permissions</li>
			</ul>
			<p>Ruby on Rails, AngularJS, LESS, Heroku</p>

		</div>
	</div>



	<div className="project">
		<a href='http://capoeiraabolicao.com'><img src="/images/work/abolicao.jpg" /></a>
		<div className="project-details">
			<h2>Capoeira Abolição</h2>
			<p>Promotional Website</p>
			<ul>
			   <li>Wordpress Custom Theme</li>
			   <li>Media Queries</li>
			</ul>
		</div>
	</div>

	<div className="project">
		<img src="/images/work/website-its.jpg" />
		<div className="project-details">
			<h2>ITS InfoCom</h2>
			<p>Company website</p>
			<ul>
			   <li>Custom CMS</li>
			   <li>Language Management</li>
			   <li>HTML export module</li>
			   <li>Google custom search integration</li>
			</ul>
			<p>PHP, MySQL, CSS, Javascript, Google CSE</p>
		</div>
	</div>


  <div className="project">
    <img src="/images/work/money-talk.jpg" />
    <div className="project-details">
      <h2>National Money Night Talk Website</h2>
      <p>Campaign website for American Express</p>
      <ul>
         <li>Developed the entire microsite</li>
      </ul>
      <p>PHP, JQuery, CSS</p>
    </div>
  </div>

    <div className="project">
    <img src="/images/work/mobtion.jpg" />
    <div className="project-details">
      <h2>Mobtion</h2>
      <p>Website</p>
      <ul>
         <li>Custom Wordpress Theme</li>
      </ul>
      <p>PHP, JQuery, CSS</p>
    </div>
  </div>


	<div className="clear"></div>

</div>
  
      
    </section>
  );
}


function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}