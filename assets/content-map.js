const contentMap = {
  sections: {
    home: {
      title: "首页",
      tags: ["乐鱼体育", "赛事", "直播"],
      desc: "提供一站式体育赛事资讯与实时比分"
    },
    news: {
      title: "新闻",
      tags: ["乐鱼体育", "体育新闻", "赛事分析"],
      desc: "最新体育新闻与深度赛事分析"
    },
    live: {
      title: "直播",
      tags: ["乐鱼体育", "直播", "高清"],
      desc: "高清赛事直播，不错过任何精彩瞬间"
    },
    data: {
      title: "数据",
      tags: ["乐鱼体育", "数据统计", "球员表现"],
      desc: "专业的体育数据统计与球员表现分析"
    }
  },
  keywords: ["乐鱼体育", "赛事直播", "比分", "数据", "分析"],
  siteUrl: "https://cnindex-leyusports.com.cn",
  version: "1.2.0"
};

function searchContent(query, sections = contentMap.sections) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  for (const [key, section] of Object.entries(sections)) {
    let score = 0;
    if (section.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }
    if (section.desc.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }
    for (const tag of section.tags) {
      if (tag.toLowerCase().includes(lowerQuery)) {
        score += 3;
      }
    }
    if (score > 0) {
      results.push({ key, ...section, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

function filterByTag(tag, sections = contentMap.sections) {
  const lowerTag = tag.toLowerCase();
  const filtered = [];
  for (const [key, section] of Object.entries(sections)) {
    const match = section.tags.some(t => t.toLowerCase().includes(lowerTag));
    if (match) {
      filtered.push({ key, ...section });
    }
  }
  return filtered;
}

function getSectionKeys(sections = contentMap.sections) {
  return Object.keys(sections);
}

function getSectionByKey(key, sections = contentMap.sections) {
  return sections[key] || null;
}

function getAllTags(sections = contentMap.sections) {
  const tagSet = new Set();
  for (const section of Object.values(sections)) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function searchWithFilter(query, tagFilter = null, sections = contentMap.sections) {
  let results = searchContent(query, sections);
  if (tagFilter) {
    results = results.filter(item => {
      const lowerTag = tagFilter.toLowerCase();
      return item.tags.some(t => t.toLowerCase().includes(lowerTag));
    });
  }
  return results;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    filterByTag,
    getSectionKeys,
    getSectionByKey,
    getAllTags,
    searchWithFilter
  };
}