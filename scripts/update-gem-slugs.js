const mongoose = require('mongoose');

const uri = 'mongodb+srv://GemAdmin:DBJShjkRQtiWwZ3S@cluster0.mz7yuip.mongodb.net/?appName=Cluster0';

const gemUpdates = [
  {
    title: 'Royal Ceylon Cornflower Blue Sapphire',
    slug: 'royal-ceylon-cornflower-blue-sapphire',
    sku: 'GEM-BLS-0482',
    labReportNumber: 'GRS-2024-098231',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    title: 'Imperial Pigeon Blood Burma Ruby',
    slug: 'imperial-pigeon-blood-burma-ruby',
    sku: 'GEM-RBY-0315',
    labReportNumber: 'GUB-2308-4412',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    title: 'Muzo Old Mine Colombian Emerald',
    slug: 'muzo-old-mine-colombian-emerald',
    sku: 'GEM-EMR-0564',
    labReportNumber: 'GIA-22184910',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    title: 'Electric Neon Paraiba Tourmaline',
    slug: 'electric-neon-paraiba-tourmaline',
    sku: 'GEM-PRB-0278',
    labReportNumber: 'GRS-2023-887412',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    title: 'Kashmir Intense Blue Sapphire',
    slug: 'kashmir-intense-blue-sapphire',
    sku: 'GEM-KSH-0342',
    labReportNumber: 'SSEF-119284',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    title: 'Rare Padparadscha Sunset Sapphire',
    slug: 'rare-padparadscha-sunset-sapphire',
    sku: 'GEM-PAD-0419',
    labReportNumber: 'LOTUS-993821-GL',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

async function run() {
  await mongoose.connect(uri);
  const collection = mongoose.connection.db.collection('gems');
  for (const update of gemUpdates) {
    await collection.updateOne(
      { title: update.title },
      {
        $set: {
          slug: update.slug,
          sku: update.sku,
          labReportNumber: update.labReportNumber,
          images: update.images,
        },
      }
    );
  }
  const gems = await collection.find({}).toArray();
  console.log('Successfully updated', gems.length, 'gemstones with slug & sku:');
  gems.forEach(g => console.log(`- ${g.title} => /gems/${g.slug} (SKU: ${g.sku})`));
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

