#  Access Youth Mobile
### Using technology to improve youth empowerment and assistance programs

For the past six months, our team at UBC Launch Pad worked with a non-profit, Access Youth, and took initiative in improving the process for helping youth in need, providing  Access Youth services through a mobile app.
Unlike other projects we've built in the past at UBC Launch Pad, this project required much greater care in planning and communication in order to improve an existing service at Access Youth. 
We tackled many architectural decisions and deliberated over different design and engineering choices to make sure that the final product could be maintainable and could support expansion over time. 

We want to walk through some specific challenges and solutions we have found through our design process, especially those that impact projects which must be reliable and servicable with minimal downtime.
In particular, we will focus on our end product design process, building the backbone for a bus tracking service, and creating the iOS apps responsible for tracking the bus.

## Access Youth

Access Youth is a non-profit organization designed to help at-risk youth across the Greater Vancouver area by providing them with counseling services. The organization has three programs: a youth career employment program, a community outreach program located in malls around the tri-cities, and the bus program which serves as a mobile counseling service for at-risk youth. Our mobile app targets the users of the bus program.

Our team of six consists of one designer, three backend engineers, and two iOS engineers. 
Faye, our designer and Access Youth Liaison, previously worked with Access Youth and was able to bring the idea and requirements to our team. 
Alan, Rachit, and Salim worked on building the backend service, configuring the deployment infrastructure, and designed the endpoints to interface with mobile clients.
Andi and Yichen worked on creating the iOS client for both the end users and the bus operator.

## Replacing and Improving Existing Features

Our product needed to improve upon the baseline of the existing Access Youth service infrastructure. The existing procedure for the organization's operation is to take phone calls from youth in the Greater Vancouver area and direct the Access Youth bus to the general vicinities, where the youths in need could meet face-to-face with a counselor for support. Our new implementation needed to be able to improve upon that model; the use of Apple's MapKit technology allows more precise GPS locations of all the requests from youths in need while simultaneously presenting the data in a more digestible format for the Access Youth operators on the bus.

## Designing a Reliable Service

The Access Youth app needs to be at least as reliable as the existing method of requesting the bus, which is to call the operator's phone. 
This means that we need to build our services to match the existing reliability and still provide features that make the Access Youth bus program better. 
Two topics we will focus on are choosing how to best deploy our backend service, and using logging to improve the maintainability of the service.

### Choosing a price efficient deployment strategy

When deploying a backend service, often times the method you choose to deploy will affect how reliably your services run. 
This is especially true when it's critical to keep the endpoints accessible at all times, even when deploying a new version of your backend service. 
Often times teams would use a kubernetes cluster and several load balanced instances to ensure that one particular instance updating won't affect the consistency of the service. 
However, financial efficiency was a top priority for this project, as non-profit organizations operate on donations and typically run on a tight budget. Cost constraints pushed our development team to look towards cost efficient deployment strategies.

At first we looked at Google's cloud platform. 
While this offers a lot of options to customize our deployments, we instead decided to go with Heroku, another cloud platform service, based on the load we expected to handle. 
Additionally, it was a fitting platform for our use case since it is straight forward to configure and set up and lets us deploy quickly with heroku-cli. 
We configured it to sync with our git repository, and added a start script with our environment variables.
Once a new version of our codebase is pushed to the repository, the deployment happens automatically.
The simplicity helps in the event that we need to hand the project off to another team and transfer the necessary knowledge to run the servers.

Financially, Heroku’s free tier is good for most personal projects, but their Hobby Dyno provides just the right amount of power for the backend we are running at a reasonable price. 
As a student, it's also convenient that we have a two year trial for a Hobby Dyno.
We may have to re-evaluate this decision if we scale to a larger number of requests in the future, but for now, Heroku works well. 


### Keeping track of issues and automating analytics

Once the service is up and running, it's important to remotely keep track of server events in case there are issues to resolve. 
Additionally, we could keep track of the app usage so that Access Youth is aware of how many people are using the service over a period of time. 
We needed one place to keep all these logs that originate from our service and our mobile and web clients.

To solve this we added a special logging endpoint that writes these logs to a database. 
These logs contain important information like from what type of client a particular request was sent in case we needed to fix an issue with our client. 
One important field we included, following analytics frameworks in many large projects, is a unique identifier. 
This identifier keeps track of network calls from the client to the server, and back to the client. 
How this works is starting from the originating client that requests some information using a network call, it generates an identifier and attaches it to the network call. 
This identifier is passed around, and if there's an issue or error with anything, the error logs will contain the exact identifier, which we can use to trace down the entire round trip call to be able to determine the root cause.

Given the type and amount of data we needed to pick the best database we wanted to store these logs in.
From a technical perspective, using a NoSQL database makes sense for this form of data, as opposed to using a traditional SQL database. 
There is no visible ‘relation’ with this data, and the more frequent operation would be writing to the database rather than reading. 
This makes our choice of a document-oriented database, MongoDB, a good fit for a large amount of data.

## The Bus

On the iOS side of the project, Andi and Yichen have been working on two separate apps that handle the operator side and the end-user side of the bus program, respectively. 
As the bus location needs to be constantly updated, one phone running the operator app sends its current location at regular intervals to our backend service, which end-users can poll using the public Access Youth app. 
One topic we would like to focus on is being able to share and reuse code and data definitions across similar apps, even though the two apps are distinct.

Both of these apps talk to the same common backend service, and many of the endpoints or data structures we use are shared between the two apps. 
We decided to write two interfaces that define the different possible network calls, but write only one implementation class that conforms to both interfaces and handles all network calls.
By doing this, even though both apps only see the endpoint methods available to them from their own respective interface, we can still reduce repeated code by implementing our network calls once.
Even though it may seem like it might be redundant to define these interfaces, it's important to expose only the necessary functions, as it improves code clarity, prevents errors when making a prohibited request, and allows us to do mocking with faked data when we run offline unit or UI tests.

## What's Next?

It's been a challenge to build this project, especially with having to coordinate different platforms, and arranging time with Access Youth outside of our regular Launch Pad meetings. 
Amidst the situation we are in right now due to social distancing, we were unfortunately unable to test the service as it would be used by the general public.
We hope that we would be able to launch this as soon as possible, to better help those who need the support services with Access Youth!
