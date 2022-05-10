### SSL Configuration

- [Initial setup](#initial-setup)
- [Obtaining the certificate](#obtaining-the-certificate)
- [Usage](#usage)

## Initial setup

In order to configure ssl we first need a domain address and a hosting server.

Once the hosting server is setup, we follow a series of steps for setting up ssl for our given domain.

1. We make sure all the packages in our instance is upto date by running `sudo apt-get update`
2. We install the software properties package. Certbot’s developers use a Personal Package Archive (PPA) to distribute Certbot. The software properties package makes it more efficient to work with PPAs.`sudo apt-get install software-properties-common`
3. Enter the following commands to install the GPG package, and add Certbot to the local apt repository:

```bash
sudo apt-get install gpg -y
```

```bash
sudo apt-add-repository ppa:certbot/certbot -y
```

Next, Enter the following command to update apt to include the new repository:

```bash
sudo apt-get update -y
```

Then install certbot using `sudo apt-get install certbot -y`

## Obtaining the certificate

First we setup environment variables so it's easier to work.

`DOMAIN=domain`
`WILDCARD=*.$DOMAIN`

We want to obtain a wildcard domain which will let us use a single certificate for a domain and its subdomains. For example, a single wildcard certificate works for the example.com top-level domain, and the blog.example.com, and stuff.example.com subdomains.

Enter the following command to confirm the variables return the correct values:

```bash
echo $DOMAIN && echo $WILDCARD
```

Next, we enter the following command to start Certbot in interactive mode. This command tells Certbot to use a manual authorization method with DNS challenges to verify domain ownership. It requests a wildcard certificate for the top-level domain, as well as its subdomains.

```bash
sudo certbot -d $DOMAIN -d $WILDCARD --manual --preferred-challenges dns certonly
```

After adding all the necessary details, we shall proceed to our domain management console, and add the `TXT` record. Certbot will verify this record and grant us the certificate.

To confirm the TXT records have propagated to the Internet’s DNS

Open a new browser window and go to https://mxtoolbox.com/TXTLookup.aspx

Enter the following text into the text box.
`_acme-challenge.<domain>`

This will let us know whether the domain has propagated.

## Usage

Once the certificate has been geenrated, we will need to store it properly so it can be used even if the application is moved to a different instance.

```bash
sudo cat /etc/letsencrypt/live/<domain>/fullchain.pem > cert.pem
```

```bash
sudo cat /etc/letsencrypt/live/<domain>/privkey.pem >> cert.pem
```

We then store the `cert.pem` file which can be referenced by our application.
