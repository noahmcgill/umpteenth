#!/usr/bin/env -S npx tsx

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface Args {
    release?: string;
    bucket?: string;
    region?: string;
    help?: boolean;
}

function parseArgs(): Args {
    const args: Args = {};
    process.argv.slice(2).forEach((arg, index, arr) => {
        switch (arg) {
            case '--release':
                args.release = arr[index + 1];
                break;
            case '--bucket':
                args.bucket = arr[index + 1];
                break;
            case '--region':
                args.region = arr[index + 1];
                break;
            case '--help':
            case '-h':
                args.help = true;
                break;
        }
    });

    if (args.help) {
        console.log(`
      Usage: npm run release -- --release <1.0.1>

      Options:
        --release    Semantic version for this release (e.g., 1.0.1)
        --help, -h   Show this help message
    `);

        /*
      // Future Options
      console.log(`
        Usage: npm run release -- --release <1.0.1> --bucket <bucket-name> [--region <aws-region>]

        Options:
          --release    Semantic version for this release (e.g., 1.0.1)
          --bucket     S3 bucket to upload the bundle
          --region     AWS region (optional, defaults to us-east-1)
          --help, -h   Show this help message
      `);
    */

        process.exit(0);
    }

    return args;
}

const { release /*bucket region*/ } = parseArgs();
if (!release /*|| !bucket*/) {
    console.error(
        'Usage: ts-node release.ts --release <1.0.1> --bucket <bucket-name>'
    );
    process.exit(1);
}

// -------------------------
// Build bundle
// -------------------------
const outDir = path.resolve(`dist`);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
console.log(`Building release ${release}...`);
execSync(`vite build`, {
    stdio: 'inherit',
    env: { ...process.env, VERSION: release },
});

const bundleFile = path.join(outDir, `bundle.${release}.js`);
if (!fs.existsSync(bundleFile)) {
    console.error('Bundle not found:', bundleFile);
    process.exit(1);
}

// -------------------------
// Git release tagging
// -------------------------
/*
console.log(`Tagging release ${release} in Git...`);
execSync(`git add .`, { stdio: 'inherit' });
execSync(`git commit -m "Release ${release}"`, { stdio: 'inherit' });
execSync(`git tag ${release}`, { stdio: 'inherit' });
execSync(`git push && git push origin ${release}`, {
  stdio: 'inherit',
});
*/

// -------------------------
// Upload to S3
// -------------------------
/*
const s3 = new S3Client({ region: region ?? 'us-east-1' });
const key = `bundle.${release}.js`;

const fileStream = fs.createReadStream(bundleFile);
const command = new PutObjectCommand({
  Bucket: bucket,
  Key: key,
  Body: fileStream,
  ContentType: 'application/javascript',
  ACL: 'public-read',
});

s3.send(command)
  .then(() => console.log(`Uploaded ${bundleFile} to s3://${bucket}/${key}`))
  .catch((err) => {
    console.error('Upload failed:', err);
    process.exit(1);
  });
*/
