/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe("RSS Feeds", function() {

// Make sure all feeds are defined, not empty
it("are defined", function() {
  expect(allFeeds).toBeDefined();
  expect(allFeeds instanceof Array).toBeTruthy();
  expect(allFeeds.length).not.toBe(0);
});

// Make sure all feeds have URL that starts with "http(s)://"
it("have URLs", function() {
  allFeeds.forEach(function(feed) {
    expect(feed.url).toBeDefined();
    expect(feed.url.length).not.toBe(0);
    expect(feed.url).toMatch(/^(http|https):\/\//);
  });
});

it("have names", function() {
  allFeeds.forEach(function(feed) {
    expect(feed.name).toBeDefined();
    expect(typeof feed.name).toBe("string");
    expect(feed.name.length).not.toBe(0);
  });
});
});

      // Testing suite of Menu
      describe('The menu', function() {

            /* A test that ensures the menu element is
             * hidden by default. You'll have to analyze the HTML and
             * the CSS to determine how we're performing the
             * hiding/showing of the menu element.
             */

    		it('menu is hidden by default', function() {
    			expect($('body').hasClass('menu-hidden')).toBe(true);
    		});

             /* A test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */

    		it('menu changes visibility', function() {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toEqual(false);
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toEqual(true);
              });
    	});

        /* A test suite named "Initial Entries" */
    	describe('Initial Entries', function() {

            /* A test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test wil require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */

    		beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
             });

             it('feed container has atleast 1 entry', function() {
                var entryNumber = $('.entry').length;
                expect(entryNumber).toBeGreaterThan(0);
             });
    	});

        /* A test suite named "New Feed Selection" */
    	describe('New Feed Selection', function() {

            /* A test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */

    		var firstFeedList;
            var secondFeedList;

    		beforeEach(function(done) {
                loadFeed(1, function() {
                    firstFeedList = $('.feed').html();
                    loadFeed(2, function() {
                        done();
                    });
                });
             });

    		afterEach(function() {
                loadFeed(0);
            });

    		  it('feed content changes', function() {
                expect(firstFeedList).toBeDefined();
                secondFeedList = $('.feed').html();
                expect(secondFeedList).toBeDefined();
                expect(firstFeedList).not.toEqual(secondFeedList);
             });

    	});
    }());
