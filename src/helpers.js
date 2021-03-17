export function mapOfferModelToOfferForm(offer, rootCategories, subCategories) {
  const category = setCategories(offer.category_id, rootCategories, subCategories);
  return {
    title: offer.title,
    category: category.root_category,
    subcategory: category.sub_category,
    price: offer.price / 100,
    description: offer.description,
    date: '',
    status: offer.status,
    subscription: offer.subscription,
    location: [
      offer.location.lat,
      offer.location.lon,
      offer.location_name,
    ],
    images: offer.photos,
    visibleFromDate: offer.visible_from_date,
    user: {
      account_type: 'private',
      name: '',
      email: '',
      password: '',
      rePassword: '',
    },
    links: {
      video: offer.links.video,
      video_2: offer.links.video_2,
      walk_video: offer.links.walk_video,
    },
    attributes: {
      1: getAttributeValue(1, offer.attributes),
      2: isTrue(getAttributeValue(2, offer.attributes)),
      3: getAttributeValue(3, offer.attributes),
      4: getAttributeValue(4, offer.attributes),
      5: isTrue(getAttributeValue(5, offer.attributes)),
      6: isTrue(getAttributeValue(6, offer.attributes)),
      7: isTrue(getAttributeValue(7, offer.attributes)),
      8: isTrue(getAttributeValue(8, offer.attributes)),
      9: getAttributeValue(9, offer.attributes),
      10: getAttributeValue(10, offer.attributes),
      11: getAttributeValue(11, offer.attributes),
      12: getAttributeValue(12, offer.attributes),
      13: getAttributeValue(13, offer.attributes),
      14: getAttributeValue(14, offer.attributes),
      15: getAttributeValues(15, offer.attributes),
      16: getAttributeValues(16, offer.attributes),
      17: getAttributeValues(17, offer.attributes),
      18: getAttributeValue(18, offer.attributes),
      19: getAttributeValue(19, offer.attributes),
    },
  };
}

function getAttributeValue(id, attributes) {
  const attribute = attributes.find(attr => attr.id === id);
  if (attribute) {
    return attribute.value;
  } else {
    return '';
  }
}

function getAttributeValues(id, attributes) {
  const attributeValues = attributes.filter(attr => attr.id === id).map(function(attr) {
    if (attr) {
      return attr.value;
    }
  });
  if (attributeValues) {
    return attributeValues;
  } else {
    return [];
  }
}

function setCategories(categoryId, rootCategories, subCategories) {
  let rootCategory = '';
  let subCategory = '';
  for (const category of rootCategories) {
    if (category.id === categoryId) {
      rootCategory = category.value;
    } else {
      for (const _subCategory of subCategories[category.value]) {
        if (_subCategory.id === categoryId) {
          rootCategory = category.value;
          subCategory = _subCategory.value;
        }
      }
    }
  }
  return { sub_category: subCategory, root_category: rootCategory };
}

function isTrue(value) {
  return value === 'true';
}
