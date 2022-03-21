# AnimalAdopt

# Scenario
The goal of the assignment is to build an online e-learning platform. The website will need to support
posting images and descriptions of the animals available for adoptions, commenting on the animals and
searching and browsing the website and apply to adopt an animal.
The client-server architecture will allow users to:
  • Browse/Search for animals by keywords and refine the results using faceted search
  • Insert descriptions of animals available for adoption, including a photo and a location
  • Apply to adopt an animal by filling a form
  • Comment on the images of the animals by:
    o Drawing on the images
    o Adding textual comments or replying to someone else’s comment.

# Browsing/Searching for animals and displaying results (20% of marks)
The search for animals can be done via
• Keywords: the user must be allowed to input a series of terms through a form. Conditions in the
form are in AND. The system must be able to search those terms in a database and return a list
of animals most relevant to the query
• Faceted search: the user must be allowed to refine the results using a series of criteria via a
menu that shows existing categories (e.g. postcode, type of animals - e.g. show me all the cats
available for adoption or show me all the animals in Sheffield). Please note you do not need to
implement a location search, you can simply tag each animal and allow to search/browse on
that.
• Your faceted search should look similar to this

# Applying to adopt an animal (5% of marks)
A user can apply to adopt an animal by filling in a form that stores the data in the database. When the
user applies to adopt an animal he should be redirected to a thank you page. The next time that animal
is visualized it should be reported as ADOPTED and the website should not accept new applications.

# The animal page (10% of marks)
The results presented for the query (list of animals) should allow accessing the individual animal page
containing all the relevant information, e.g. address, type of animal, and photos.
The page should allow further navigation using standard techniques such as for example ability to
navigate to a list of similar animals using tags and/or location.

# Creating a new page for an available animal (10% of marks)
Users must be able to add new animal pages to the system. The information required will be town, type
of animal, and one photo. There must be a way to insert tags/keyword to facilitate search.

# Commenting on an animal page (20% of marks)
Users must be able to add comments to an animal page. 
Comments must be of two types:
• Drawings on the image itself (using HTML5 Canvas and JavaScript)
• Textual comments under the image
These must be uploaded to the server and be visible by other users as well, who must be able to reply
to the textual comments.

# The Server Architecture (5% of marks)
The server must be implemented in Express/NodeJS and must use JSON data exchange format. That
means that a simple direct POST from an HTML form is NOT acceptable.

# The Database (5% of marks)
The above architecture and require the definition of a database of animals using MongoDB.

# A responsive web design (5% of marks)
The website must be built as using a Responsive Web Design, i.e. it must be built so that the site must
look good on all devices (desktops, tablets, and phones). You must use CSS and Javascript to make sure
that this happens. The user must be able to print plain versions of the animal page without the images.
The use of libraries such as Bootstrap is allowed. In the report you should detail how you have achieved
a responsive web design.

# Quality of the code (5% of marks)
We will evaluate the quality of your code, looking at how easy to execute it is, the code style, naming
and format, handling of exceptions and code organization.

# Accessibility (5% of marks)
We will evaluate the accessibility of your project, checking that you have properly used standards. You
are encouraged to insert an accessibility report for your project and/or to explain in the report what
steps you have taken to ensure accessibility.

# Documentation (4% of marks)
We will evaluate the quality of your documentation in terms of:
• code documentation
• quality of the report (i.e. does it contain all the mandatory sections etc)

# Additional features (6% of marks)
We will award an additional 6% of marks for up to three additional features that you choose to
implement (2% for each feature). You must make very clear in the report what the features are, how
you have implemented them, why etc.
In alternative to three additional feature you can implement login/logout and user roles for:
• admin users, that can upload new animals for adoption
• standard users, that can browse animals, comment and apply for adoption.
