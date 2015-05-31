# AWS Lambda as CMS

Welcome to the new world, beyond scalability.

Small CMS application build on top of AWS Lambda, withou instances, database and load balancer.

Now, it's possible to have your entire website hosted no S3 or CloudFront with dynamic content, without API's or even EC2 instances or RDS database. 

## Getting Started

Steps:

	1 - Clone repo

	2 - Generate de ZIP file with the NodeJs code for AWS Lambda
			Edit in index.js the path to your bucket. Line 21
			Zip files index.js and node_modules foilder = lambda-cms.zip
	
	3 - Create bucket
			In this example I used "lambda-cms"
			Transform the bucket in static website.
	
	4 - Create Lambda function
			Upload file.zip to your Lambda function
			In this example, I used "lambdaCMS" as lambda function to be invoked.

			IAM ROLE - S3 Access
			In the Lambda Role inside IAM setup, you must attach the policy for Amazon S3 full access, in order of the Lambda function to write the JSON file.
	
	5 - Create IAM user to be authorized to update the website.
			Give to this user permission only to execute invoke Lambda functions.
			Create policy with:

			{
			    "Version": "2015-05-31",
			    "Statement": [
			        {
			            "Effect": "Allow",
			            "Action": [
			                "lambda:*"
			            ],
			            "Resource": "*"
			        }
			    ]
			}

	
	6 - Check your new CMS at index.html and the admin page at admin.html
			Put your AccessKey and your SecretKey and edit the JSON to update your site.


## Bugs and Issues

Bug or an issue? [Open a new issue](https://github.com/jonathanbaraldi/lambda-cms) here on GitHub.

## Creator

AWS Lamba CMS is created and maintained by Jonathan Baraldi - jonathanbaraldi@gmail.com.
* https://twitter.com/BaraldiJonathan
* https://github.com/jonathanbaraldi

## Copyright and License

Copyright 2015. Code released under the [GNU GENERAL PUBLIC LICENSE].