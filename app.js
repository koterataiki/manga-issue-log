const STORE_KEY = "manga-issue-log-v10";

const TAGS = [
  "設定開示",
  "新展開",
  "急展開",
  "転換点",
  "ピンチ",
  "反撃",
  "戦闘回",
  "決着",
  "伏線提示",
  "伏線回収",
  "キャラ掘り下げ",
  "新キャラ",
  "関係変化",
  "修行/強化",
  "箸休め",
  "読切",
  "休載",
  "巻頭カラー",
  "センターカラー",
];

const MOODS = {
  positive: "好評",
  surprise: "驚き",
  mixed: "賛否",
  concern: "不安",
  quiet: "静か",
};

const COLORS = ["#d54435", "#087a80", "#2564a9", "#b47a1c", "#52733a", "#7453a6", "#9f4f2c"];

const fictionSeries = [
  { id: "series-stardust", name: "星屑スプリンター", author: "青井ハル", color: "#d54435" },
  { id: "series-shadow", name: "影縫い探偵団", author: "東雲すず", color: "#087a80" },
  { id: "series-lumina", name: "ルミナキッチン", author: "灯野まどか", color: "#2564a9" },
  { id: "series-libera", name: "鉄火のリベラ", author: "黒町ゲン", color: "#b47a1c" },
  { id: "series-demon", name: "となりの魔王部", author: "白石ユウ", color: "#52733a" },
  { id: "series-orbit", name: "オービット校舎", author: "水瀬カイ", color: "#7453a6" },
  { id: "series-needle", name: "針と祈りの街", author: "秋里ナナ", color: "#9f4f2c" },
  { id: "series-bloom", name: "ブルームブレイカー", author: "森谷レン", color: "#cf5f8a" },
  { id: "series-clock", name: "午前零時の時計兵", author: "鳴海トオル", color: "#4d7fb8" },
  { id: "series-ghost", name: "ゴーストノーツ", author: "篠宮リク", color: "#6f8f3a" },
  { id: "series-cider", name: "サイダー坂の決闘", author: "小町ユウ", color: "#d18b2f" },
  { id: "series-ark", name: "箱舟のミナト", author: "雨宮ソラ", color: "#3f8f84" },
  { id: "series-puppet", name: "人形師マキナ", author: "久瀬トモ", color: "#8c67b0" },
  { id: "series-ember", name: "エンバー・コード", author: "榊リン", color: "#c84b3a" },
  { id: "series-salt", name: "塩風ランナウェイ", author: "夏目シオ", color: "#4b9ab0" },
  { id: "series-bird", name: "鳥籠オーケストラ", author: "三枝ミオ", color: "#91763d" },
  { id: "series-mirror", name: "鏡面ヒーローズ", author: "有馬セイ", color: "#5573c9" },
  { id: "series-robot", name: "廃工場のロボ太", author: "早瀬マル", color: "#6a8b5f" },
  { id: "series-moon", name: "月曜日の竜騎士", author: "花森ユキ", color: "#b65791" },
  { id: "series-cloud", name: "雲上コンパス", author: "北町ノア", color: "#607d9a" },
];

const orderMatrix = [
  ["series-stardust", "series-shadow", "series-lumina", "series-libera", "series-demon"],
  ["series-shadow", "series-libera", "series-stardust", "series-demon", "series-lumina"],
  ["series-lumina", "series-stardust", "series-shadow", "series-libera", "series-demon"],
  ["series-libera", "series-shadow", "series-demon", "series-stardust", "series-lumina"],
  ["series-stardust", "series-demon", "series-libera", "series-lumina", "series-shadow"],
  ["series-demon", "series-stardust", "series-shadow", "series-libera", "series-lumina"],
  ["series-shadow", "series-lumina", "series-stardust", "series-demon", "series-libera"],
  ["series-libera", "series-stardust", "series-shadow", "series-lumina", "series-demon"],
];

const seriesPlans = {
  "series-stardust": {
    baseChapter: 41,
    titles: ["風を盗む日", "第七レーン", "靴紐の誓い", "雨中のスタート", "ゼロ秒の背中", "観客席の声", "追い風の条件", "ゴールライン前夜"],
    tags: [["新展開", "設定開示"], ["ピンチ", "関係変化"], ["キャラ掘り下げ", "伏線提示"], ["急展開", "反撃"], ["転換点", "修行/強化"], ["箸休め", "関係変化"], ["伏線回収", "新展開"], ["決着", "反撃"]],
    scores: [7, 8, 8, 9, 8, 7, 9, 9],
  },
  "series-shadow": {
    baseChapter: 18,
    titles: ["消えた鍵", "三枚目の写真", "裏窓の少年", "影の署名", "時計塔の依頼", "夜会の罠", "探偵団解散?", "真犯人の癖"],
    tags: [["設定開示", "伏線提示"], ["新キャラ", "新展開"], ["ピンチ", "急展開"], ["伏線回収", "転換点"], ["箸休め", "キャラ掘り下げ"], ["ピンチ", "新展開"], ["関係変化", "急展開"], ["決着", "伏線回収"]],
    scores: [8, 8, 7, 9, 7, 8, 9, 9],
  },
  "series-lumina": {
    baseChapter: 12,
    titles: ["朝市の魔法鍋", "焦げた星砂糖", "客席の王女", "冷たい厨房", "まかない勝負", "休業の貼り紙", "香草の地図", "満月のレシピ"],
    tags: [["箸休め", "設定開示"], ["新展開", "キャラ掘り下げ"], ["新キャラ", "関係変化"], ["ピンチ", "急展開"], ["反撃", "決着"], ["休載"], ["伏線提示", "設定開示"], ["伏線回収", "新展開"]],
    scores: [7, 7, 8, 8, 8, 0, 7, 8],
  },
  "series-libera": {
    baseChapter: 27,
    titles: ["火線都市", "鎖を断つ", "地下議会", "赤い宣誓", "反乱前夜", "処刑台の朝", "旗を掲げろ", "解放区"],
    tags: [["戦闘回", "設定開示"], ["反撃", "キャラ掘り下げ"], ["伏線提示", "新展開"], ["転換点", "ピンチ"], ["急展開", "関係変化"], ["ピンチ", "戦闘回"], ["反撃", "伏線回収"], ["決着", "新展開"]],
    scores: [8, 8, 8, 9, 9, 8, 10, 9],
  },
  "series-demon": {
    baseChapter: 55,
    titles: ["入部届", "魔王の弱点", "文化祭会議", "勇者、転校", "放課後ダンジョン", "部費ゼロ", "魔界合宿", "となりの玉座"],
    tags: [["箸休め", "新展開"], ["キャラ掘り下げ", "関係変化"], ["設定開示", "箸休め"], ["新キャラ", "急展開"], ["ピンチ", "反撃"], ["箸休め", "関係変化"], ["新展開", "設定開示"], ["転換点", "伏線提示"]],
    scores: [7, 8, 7, 8, 8, 7, 8, 9],
  },
};

const starterData = buildStarterData();

function buildStarterData() {
  const issues = Array.from({ length: 10 }, (_, index) => {
    const number = 17 + index;
    return {
      id: `issue-2026-${number}`,
      year: 2026,
      number: String(number),
      numberEnd: "",
      merged: false,
      label: `Weekly Manga Issue ${number} (2026)`,
      date: "",
      sourceNote: "架空20作品で作った10週分の仮データです。順位推移とタグ分析の検証用です。",
    };
  });

  const series = fictionSeries.map((item, index) => ({
    ...item,
    status: index < 3 ? "新連載" : "連載中",
    firstSeenIssueId: issues[0].id,
    currentPage: "",
    feature: "",
    memo: "",
    color: item.color || COLORS[index % COLORS.length],
  }));

  const tagSets = [
    ["設定開示", "伏線提示"],
    ["新展開", "新キャラ"],
    ["ピンチ", "急展開"],
    ["反撃", "戦闘回"],
    ["転換点", "関係変化"],
    ["伏線回収", "決着"],
    ["キャラ掘り下げ", "箸休め"],
    ["修行/強化", "設定開示"],
  ];
  const titleWords = ["接近", "予兆", "対決", "秘密", "分岐点", "再会", "突破口", "夜明け", "選択", "余波"];
  const baseRanks = [3, 5, 7, 2, 9, 4, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1];
  const orderForWeek = (weekIndex) => [...fictionSeries]
    .map((item, index) => {
      const weakSlide = index >= 15 ? weekIndex * 0.55 : index >= 12 ? weekIndex * 0.25 : 0;
      const strongLift = index <= 4 ? -Math.min(2, weekIndex * 0.08) : 0;
      const newSeriesBoost = index < 3 && weekIndex < 3 ? -3 + weekIndex : 0;
      const wobble = (((index * 3 + weekIndex * 2) % 5) - 2) * 0.55;
      const comeback = index === 10 && weekIndex >= 7 ? -3 : 0;
      return {
        item,
        rankSeed: baseRanks[index] + weakSlide + strongLift + newSeriesBoost + wobble + comeback,
      };
    })
    .sort((a, b) => a.rankSeed - b.rankSeed || a.item.id.localeCompare(b.item.id))
    .map((row) => row.item.id);

  const chapters = [];
  issues.forEach((issue, issueIndex) => {
    orderForWeek(issueIndex).forEach((seriesId, orderIndex) => {
      const seriesIndex = fictionSeries.findIndex((item) => item.id === seriesId);
      const colorTag = orderIndex === 0
        ? "巻頭カラー"
        : (issueIndex + seriesIndex) % 9 === 0
          ? "センターカラー"
          : "";
      const baseTags = [...tagSets[(issueIndex + seriesIndex) % tagSets.length]];
      if ((issueIndex + seriesIndex) % 23 === 0 && orderIndex > 10) baseTags.splice(0, baseTags.length, "休載");
      const tags = [...new Set([...(colorTag ? [colorTag] : []), ...baseTags])];
      const isBreak = tags.includes("休載");
      const title = `${titleWords[issueIndex]} ${issueIndex + 1}`;
      chapters.push({
        id: `chapter-${seriesId}-${issue.id}`,
        issueId: issue.id,
        seriesId,
        chapterNo: isBreak ? "" : 10 + seriesIndex * 6 + issueIndex,
        title,
        page: "",
        order: orderIndex + 1,
        colorTag: isBreak ? "" : colorTag,
        summary: isBreak
          ? "今週は休載。次回更新待ち。"
          : `${title}で物語の焦点が動き、${baseTags[0]}として記録したい回。順位は${orderIndex + 1}位。`,
        tags,
        mood: isBreak ? "quiet" : issueIndex % 3 === 0 ? "surprise" : issueIndex % 3 === 1 ? "positive" : "mixed",
        reaction: isBreak
          ? "休載への残念さはあるが、次回への期待も残っている。"
          : `読者の反応は${baseTags[0]}への言及が多め。順位と評価の動きも見たい回。`,
        myThought: isBreak
          ? "休載も履歴として残しておく。掲載順位平均からは除外する。"
          : `この回は${baseTags.join("・")}の指標であとから比較できそう。`,
        prediction: isBreak ? "次号で流れが再開するか確認。" : "次号でこの要素が継続するかを見る。",
        score: isBreak ? 0 : 10 - Math.min(5, Math.floor(orderIndex / 4)) + ((issueIndex + seriesIndex) % 2),
        logged: true,
        createdAt: "2026-05-31T00:00:00.000Z",
        updatedAt: "2026-05-31T00:00:00.000Z",
      });
    });
  });

  return {
    currentIssueId: "issue-2026-26",
    customTags: [],
    issues,
    series,
    chapters,
  };
}

let state = loadState();
let activeScreen = "current";
let editingChapterId = null;
let focusedSeriesId = "";
let draggedChapterId = "";
let suppressNextClick = false;
let seriesSearch = "";
let logSearch = "";
let seriesFilter = "";
let tagFilter = "";
let analysisScope = "current";
let analysisFocus = "";

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  renderTagPicker();
  render();
});

function cacheElements() {
  Object.assign(els, {
    currentIssueHero: document.querySelector("#currentIssueHero"),
    metricSeries: document.querySelector("#metricSeries"),
    metricLogged: document.querySelector("#metricLogged"),
    metricAverage: document.querySelector("#metricAverage"),
    completionText: document.querySelector("#completionText"),
    completionBar: document.querySelector("#completionBar"),
    currentIssueCount: document.querySelector("#currentIssueCount"),
    previousIssueButton: document.querySelector("#previousIssueButton"),
    nextIssueButton: document.querySelector("#nextIssueButton"),
    openAddSeriesButton: document.querySelector("#openAddSeriesButton"),
    tocList: document.querySelector("#tocList"),
    logOverlay: document.querySelector("#logOverlay"),
    closeLogButton: document.querySelector("#closeLogButton"),
    chapterForm: document.querySelector("#chapterForm"),
    chapterSeries: document.querySelector("#chapterSeries"),
    logFormTitle: document.querySelector("#logFormTitle"),
    saveChapterButton: document.querySelector("#saveChapterButton"),
    tagPicker: document.querySelector("#tagPicker"),
    customTagInput: document.querySelector("#customTagInput"),
    addCustomTagButton: document.querySelector("#addCustomTagButton"),
    scoreInput: document.querySelector("#scoreInput"),
    scoreValue: document.querySelector("#scoreValue"),
    seriesSearchInput: document.querySelector("#seriesSearchInput"),
    seriesForm: document.querySelector("#seriesForm"),
    seriesList: document.querySelector("#seriesList"),
    backToSeriesButton: document.querySelector("#backToSeriesButton"),
    seriesStatusSelect: document.querySelector("#seriesStatusSelect"),
    saveSeriesStatusButton: document.querySelector("#saveSeriesStatusButton"),
    seriesDetailHero: document.querySelector("#seriesDetailHero"),
    seriesScoreTimeline: document.querySelector("#seriesScoreTimeline"),
    seriesTagBars: document.querySelector("#seriesTagBars"),
    seriesHistoryList: document.querySelector("#seriesHistoryList"),
    logSearchInput: document.querySelector("#logSearchInput"),
    seriesFilter: document.querySelector("#seriesFilter"),
    tagFilter: document.querySelector("#tagFilter"),
    chapterList: document.querySelector("#chapterList"),
    analysisScopeSelect: document.querySelector("#analysisScopeSelect"),
    analysisFocusSelect: document.querySelector("#analysisFocusSelect"),
    analysisRanking: document.querySelector("#analysisRanking"),
    orderComparisonChart: document.querySelector("#orderComparisonChart"),
    tagBars: document.querySelector("#tagBars"),
    createNextIssueButton: document.querySelector("#createNextIssueButton"),
    exportButton: document.querySelector("#exportButton"),
    quickExportButton: document.querySelector("#quickExportButton"),
    importInput: document.querySelector("#importInput"),
    resetButton: document.querySelector("#resetButton"),
    issueNote: document.querySelector("#issueNote"),
    seedNote: document.querySelector("#seedNote"),
  });
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeScreen = button.dataset.screen;
      renderScreen();
    });
  });

  els.currentIssueHero.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='next-issue']")) createNextIssue();
  });
  els.currentIssueHero.addEventListener("change", (event) => {
    if (event.target.matches("#issueSwitcher")) {
      state.currentIssueId = event.target.value;
      persist();
      cancelEdit();
      render();
    }
    if (event.target.matches("#heroMergedIssueToggle")) {
      updateMergedIssue(event.target.checked);
    }
  });

  els.tocList.addEventListener("click", handleTocClick);
  els.previousIssueButton.addEventListener("click", () => moveIssue(-1));
  els.nextIssueButton.addEventListener("click", () => moveIssue(1));
  els.openAddSeriesButton.addEventListener("click", () => {
    activeScreen = "series";
    renderScreen();
    els.seriesForm.scrollIntoView({ behavior: "smooth", block: "start" });
    els.seriesForm.elements.name.focus();
  });
  els.tocList.addEventListener("dragstart", handleDragStart);
  els.tocList.addEventListener("dragover", handleDragOver);
  els.tocList.addEventListener("drop", handleDrop);
  els.tocList.addEventListener("dragend", handleDragEnd);

  els.chapterForm.addEventListener("submit", saveChapter);
  els.closeLogButton.addEventListener("click", cancelEdit);
  els.logOverlay.addEventListener("click", (event) => {
    if (event.target === els.logOverlay) cancelEdit();
  });
  els.scoreInput.addEventListener("input", updateScoreLabel);
  els.addCustomTagButton.addEventListener("click", addCustomTag);
  els.customTagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomTag();
    }
  });

  els.seriesSearchInput.addEventListener("input", (event) => {
    seriesSearch = event.target.value.trim().toLowerCase();
    renderSeriesList();
  });
  els.seriesForm.addEventListener("submit", saveSeries);
  els.seriesList.addEventListener("click", handleSeriesClick);
  els.backToSeriesButton.addEventListener("click", () => {
    activeScreen = "series";
    renderScreen();
  });
  els.saveSeriesStatusButton.addEventListener("click", saveSeriesStatus);

  els.logSearchInput.addEventListener("input", (event) => {
    logSearch = event.target.value.trim().toLowerCase();
    renderChapterList();
  });
  els.seriesFilter.addEventListener("change", (event) => {
    seriesFilter = event.target.value;
    renderChapterList();
  });
  els.tagFilter.addEventListener("change", (event) => {
    tagFilter = event.target.value;
    renderChapterList();
  });
  els.chapterList.addEventListener("click", handleChapterClick);
  els.analysisScopeSelect.addEventListener("change", (event) => {
    analysisScope = event.target.value;
    analysisFocus = "";
    renderAnalysis();
  });
  els.analysisFocusSelect.addEventListener("change", (event) => {
    analysisFocus = event.target.value;
    renderAnalysis();
  });

  els.createNextIssueButton.addEventListener("click", createNextIssue);
  els.exportButton.addEventListener("click", exportData);
  els.quickExportButton.addEventListener("click", exportData);
  els.importInput.addEventListener("change", importData);
  els.resetButton.addEventListener("click", resetData);
}

function render() {
  renderScreen();
  renderIssueHero();
  renderMetrics();
  renderSelectors();
  renderIssueNavButtons();
  renderToc();
  renderSeriesList();
  renderChapterList();
  renderAnalysis();
  renderSeriesDetail();
  renderSettings();
}

function renderScreen() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === `screen-${activeScreen}`);
  });
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === activeScreen);
  });
}

function renderIssueHero() {
  const issue = currentIssue();
  const latestIssue = sortedIssues()[0];
  const isLatest = issue.id === latestIssue.id;
  const issueOptions = sortedIssues().map((item) => {
    const selected = item.id === issue.id ? "selected" : "";
    return `<option value="${item.id}" ${selected}>${escapeHtml(issueShortLabel(item))}</option>`;
  }).join("");
  const issueRail = sortedIssues()
    .slice()
    .reverse()
    .map((item) => {
      const classes = [
        "issue-dot",
        item.id === issue.id ? "is-current" : "",
        item.id === latestIssue.id ? "is-latest" : "",
      ].filter(Boolean).join(" ");
      const label = item.id === latestIssue.id ? `最新号 ${issueShortLabel(item)}` : issueShortLabel(item);
      return `<button class="${classes}" data-issue-id="${item.id}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}"></button>`;
    }).join("");

  els.currentIssueHero.innerHTML = `
    <div class="issue-title">
      <span>${isLatest ? "最新号を編集中" : "過去号を編集中"}</span>
      <h2>${escapeHtml(issueDisplayTitle(issue))}</h2>
      <p>${escapeHtml(issue.sourceNote || "この号の掲載順と読書ログを管理します。")}</p>
      <div class="issue-rail" aria-label="号の位置">${issueRail}</div>
      <div class="issue-actions">
        <select id="issueSwitcher" aria-label="号を切り替える">${issueOptions}</select>
        <label class="hero-toggle">
          <input type="checkbox" id="heroMergedIssueToggle" ${issue.merged ? "checked" : ""} />
          <span>合併号</span>
        </label>
        <button class="light-button" type="button" data-action="next-issue">次号を作成</button>
      </div>
    </div>
    <div class="issue-number">
      <small>${isLatest ? "LATEST" : "ISSUE"}</small>
      <strong>${escapeHtml(issueNumberDisplay(issue))}</strong>
    </div>
  `;
  els.currentIssueHero.querySelectorAll(".issue-dot").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentIssueId = button.dataset.issueId;
      persist();
      cancelEdit();
      render();
    });
  });
}

function renderMetrics() {
  const chapters = currentChapters();
  const logged = chapters.filter((chapter) => chapter.logged).length;
  const scores = chapters.map((chapter) => Number(chapter.score)).filter((score) => score > 0);
  els.metricSeries.textContent = chapters.length;
  els.metricLogged.textContent = `${logged}/${chapters.length}`;
  els.metricAverage.textContent = scores.length ? average(scores).toFixed(1) : "-";
  els.currentIssueCount.textContent = `${chapters.length}本`;
  const rate = chapters.length ? Math.round((logged / chapters.length) * 100) : 0;
  els.completionText.textContent = `${rate}%`;
  els.completionBar.style.width = `${rate}%`;
}

function renderSelectors() {
  const options = state.series
    .map((series) => `<option value="${series.id}">${escapeHtml(series.name)}</option>`)
    .join("");
  els.chapterSeries.innerHTML = options;

  els.seriesFilter.innerHTML = [
    `<option value="">すべての作品</option>`,
    ...state.series.map((series) => `<option value="${series.id}">${escapeHtml(series.name)}</option>`),
  ].join("");
  els.seriesFilter.value = seriesFilter;

  els.tagFilter.innerHTML = [
    `<option value="">すべてのタグ</option>`,
    ...allTags().map((tag) => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`),
  ].join("");
  els.tagFilter.value = tagFilter;
}

function renderIssueNavButtons() {
  const issues = sortedIssues().slice().reverse();
  const index = issues.findIndex((issue) => issue.id === currentIssue().id);
  els.previousIssueButton.disabled = index <= 0;
  els.nextIssueButton.disabled = index < 0 || index >= issues.length - 1;
}

function moveIssue(direction) {
  const issues = sortedIssues().slice().reverse();
  const index = issues.findIndex((issue) => issue.id === currentIssue().id);
  const next = issues[index + direction];
  if (!next) return;
  state.currentIssueId = next.id;
  persist();
  cancelEdit();
  render();
}

function renderTagPicker() {
  els.tagPicker.innerHTML = allTags().map((tag) => `
    <label class="check-chip">
      <input type="checkbox" name="tags" value="${escapeHtml(tag)}" />
      ${escapeHtml(tag)}
    </label>
  `).join("");
}

function allTags() {
  return [...new Set([...TAGS, ...(state?.customTags || [])])];
}

function addCustomTag() {
  const tag = els.customTagInput.value.trim();
  if (!tag) return;
  const selected = new Set([...els.chapterForm.querySelectorAll("input[name='tags']:checked")].map((input) => input.value));
  selected.add(tag);
  state.customTags ||= [];
  if (!allTags().includes(tag)) {
    state.customTags.push(tag);
    persist();
  }
  els.customTagInput.value = "";
  renderTagPicker();
  renderSelectors();
  els.chapterForm.querySelectorAll("input[name='tags']").forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function renderToc() {
  const chapters = currentChapters().sort((a, b) => a.order - b.order);
  els.tocList.innerHTML = chapters.map((chapter) => {
    const series = findSeries(chapter.seriesId);
    const colorBadge = chapter.colorTag ? `<span class="badge color">${escapeHtml(chapter.colorTag)}</span>` : "";
    const statusBadge = series.status !== "連載中" ? `<span class="badge status">${escapeHtml(series.status)}</span>` : "";
    const hiatusBadge = isHiatus(chapter) ? `<span class="badge warning">休載</span>` : "";
    const avgOrder = averageRecentOrder(series.id);
    const badges = [
      chapter.chapterNo ? `<span class="badge">#${escapeHtml(chapter.chapterNo)}</span>` : "",
      chapter.logged ? `<span class="badge done">記録済み</span>` : "",
    ].filter(Boolean).join("");
    return `
      <article class="toc-item ${chapter.logged ? "is-logged" : ""} ${isHiatus(chapter) ? "is-hiatus" : ""} ${isInvalidAfterEnd(chapter) ? "is-invalid" : ""}" draggable="true" data-id="${chapter.id}">
        <div class="toc-order">${chapter.order}</div>
        <div class="toc-main">
          <strong>${escapeHtml(series.name)} <span class="avg-chip">${escapeHtml(formatRecentOrder(avgOrder))}</span> ${colorBadge}${statusBadge}${hiatusBadge}</strong>
          <span>${escapeHtml(series.author || "作者未設定")}</span>
        </div>
        <div class="toc-badges">${badges}</div>
      </article>
    `;
  }).join("");
}

function renderSeriesList() {
  const query = seriesSearch;
  const rows = state.series
    .filter((series) => !query || `${series.name} ${series.author}`.toLowerCase().includes(query))
    .sort((a, b) => currentOrderForSeries(a.id) - currentOrderForSeries(b.id));

  els.seriesList.innerHTML = rows.map((series) => {
    const chapters = chaptersForSeries(series.id);
    const loggedCount = chapters.filter((chapter) => chapter.logged).length;
    const scoreAverage = averageOrZero(chapters.map((chapter) => Number(chapter.score)).filter((score) => score > 0));
    const avgOrder = averageRecentOrder(series.id);
    const invalidCount = chapters.filter(isInvalidAfterEnd).length;
    return `
      <article class="series-card ${invalidCount ? "has-warning" : ""}" style="--series-color: ${series.color}" data-id="${series.id}">
        <div class="series-mark"></div>
        <div>
          <h3>${escapeHtml(series.name)}</h3>
          <div class="series-meta">${escapeHtml(series.author || "作者未設定")} ・ ${escapeHtml(series.status)} ・ ${escapeHtml(formatRecentOrder(avgOrder))}</div>
        </div>
        <div class="series-stat">
          ${loggedCount}件${invalidCount ? " / 要確認" : ""}<br />
          評価 ${scoreAverage ? scoreAverage.toFixed(1) : "-"}
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-state">該当する作品がありません</div>`;
}

function renderChapterList() {
  const query = logSearch;
  let rows = [...state.chapters];
  if (seriesFilter) rows = rows.filter((chapter) => chapter.seriesId === seriesFilter);
  if (tagFilter) rows = rows.filter((chapter) => chapter.tags.includes(tagFilter));
  if (query) {
    rows = rows.filter((chapter) => chapterSearchText(chapter).includes(query));
  }

  els.chapterList.innerHTML = rows
    .sort((a, b) => issueSortValue(findIssue(b.issueId)) - issueSortValue(findIssue(a.issueId)) || a.order - b.order)
    .map((chapter) => chapterCard(chapter, true))
    .join("") || `<div class="empty-state">該当する掲載話ログがありません</div>`;
}

function renderAnalysis() {
  els.analysisScopeSelect.value = analysisScope;
  const seriesRows = analysisSeries();
  if (analysisFocus && !seriesRows.some((series) => series.id === analysisFocus)) {
    analysisFocus = "";
  }
  els.analysisFocusSelect.innerHTML = [
    `<option value="">対象作品すべて</option>`,
    ...seriesRows.map((series) => `<option value="${series.id}">${escapeHtml(series.name)}</option>`),
  ].join("");
  els.analysisFocusSelect.value = analysisFocus;

  const displaySeries = analysisFocus ? seriesRows.filter((series) => series.id === analysisFocus) : seriesRows;
  const displayChapters = state.chapters.filter((chapter) => displaySeries.some((series) => series.id === chapter.seriesId));

  renderAnalysisRanking(displaySeries);
  renderOrderComparison(displaySeries);
  const logged = displayChapters.filter((chapter) => chapter.logged);
  const tagRows = countTags(logged);
  els.tagBars.innerHTML = tagRows.length
    ? tagRows.map(([tag, count], index) => barItem(tag, count, Math.max(...tagRows.map((row) => row[1])), COLORS[index % COLORS.length])).join("")
    : `<div class="empty-state">対象範囲にタグ付きの記録がまだありません</div>`;
}

function analysisSeries() {
  let rows = [...state.series];
  if (analysisScope === "new") {
    rows = rows.filter((series) => series.status === "新連載");
  } else if (analysisScope === "current") {
    rows = rows.filter((series) => series.status !== "連載終了" && series.status !== "読切");
  }
  return rows;
}

function renderAnalysisRanking(seriesRows) {
  const rows = seriesRows
    .map((series) => ({ series, stats: orderStats(series.id) }))
    .filter((row) => row.stats.count > 0)
    .sort((a, b) => a.stats.avg - b.stats.avg);

  els.analysisRanking.innerHTML = rows.map((row, index) => {
    const trendLabel = row.stats.trend > 0 ? `↑ ${row.stats.trend}` : row.stats.trend < 0 ? `↓ ${Math.abs(row.stats.trend)}` : "→";
    const trendClass = row.stats.trend > 0 ? "is-up" : row.stats.trend < 0 ? "is-down" : "";
    return `
      <article class="ranking-row" style="--series-color:${row.series.color}">
        <strong>${index + 1}</strong>
        <div>
          <h3>${escapeHtml(row.series.name)}</h3>
          <span>${escapeHtml(formatRecentOrder({ avg: row.stats.avg, count: row.stats.count, limit: 8 }))} ・ 最新${row.stats.latest || "-"}位</span>
        </div>
        <em class="${trendClass}">${trendLabel}</em>
      </article>
    `;
  }).join("") || `<div class="empty-state">比較できる掲載順データがありません</div>`;
}

function renderOrderComparison(seriesRows) {
  const issues = sortedIssues().slice().reverse();
  if (!seriesRows.length || !issues.length) {
    els.orderComparisonChart.innerHTML = `<div class="empty-state">比較対象の作品がありません</div>`;
    return;
  }

  const maxOrder = Math.max(5, ...state.chapters.map((chapter) => Number(chapter.order) || 1));
  const width = 980;
  const height = 320;
  const pad = { top: 42, right: 170, bottom: 46, left: 42 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const xFor = (index) => pad.left + (issues.length === 1 ? plotWidth / 2 : (plotWidth / (issues.length - 1)) * index);
  const yFor = (order) => pad.top + ((Number(order) - 1) / Math.max(1, maxOrder - 1)) * plotHeight;
  const yTicks = [...new Set([1, 3, 5, 10, maxOrder].filter((tick) => tick <= maxOrder))];

  const grid = [
    ...yTicks.map((tick) => `
      <g>
        <line x1="${pad.left}" y1="${yFor(tick)}" x2="${width - pad.right}" y2="${yFor(tick)}" class="rank-grid-line" />
        <text x="${pad.left - 16}" y="${yFor(tick) + 4}" class="rank-axis-label">${tick}</text>
      </g>
    `),
    ...issues.map((issue, index) => `
      <g>
        <line x1="${xFor(index)}" y1="${pad.top}" x2="${xFor(index)}" y2="${pad.top + plotHeight}" class="rank-grid-v" />
        <text x="${xFor(index)}" y="24" class="rank-issue-label">${escapeHtml(issueNumberDisplay(issue))}号</text>
      </g>
    `),
  ].join("");

  const latestLabelIds = new Set(
    seriesRows
      .map((series) => {
        const latestChapter = [...issues].reverse()
          .map((issue) => state.chapters.find((item) => item.issueId === issue.id && item.seriesId === series.id))
          .find((chapter) => chapter && !isHiatus(chapter));
        return { series, order: Number(latestChapter?.order) || 999 };
      })
      .sort((a, b) => a.order - b.order)
      .slice(0, analysisFocus ? 20 : 5)
      .map((row) => row.series.id)
  );

  const seriesLines = seriesRows.map((series) => {
    const points = issues.map((issue, index) => {
      const chapter = state.chapters.find((item) => item.issueId === issue.id && item.seriesId === series.id);
      if (!chapter || isHiatus(chapter)) return null;
      return { x: xFor(index), y: yFor(chapter.order), chapter };
    }).filter(Boolean);
    if (!points.length) return "";
    const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
    const circles = points.map((point) => {
      const tags = (point.chapter.tags || []).filter((tag) => !["巻頭カラー", "センターカラー"].includes(tag));
      return `<circle class="rank-point" cx="${point.x}" cy="${point.y}" r="5.5" fill="${series.color}" data-series="${escapeHtml(series.name)}" data-issue="${escapeHtml(issueShortLabel(findIssue(point.chapter.issueId)))}" data-order="${point.chapter.order}" data-tags="${escapeHtml(JSON.stringify(tags))}" data-summary="${escapeHtml(point.chapter.summary || "未記録")}" />`;
    }).join("");
    const latest = points[points.length - 1];
    const latestLabel = latestLabelIds.has(series.id) ? `
        <g class="latest-label">
          <rect x="${latest.x + 10}" y="${latest.y - 15}" width="150" height="30" rx="4" fill="${series.color}" />
          <text x="${latest.x + 20}" y="${latest.y + 5}">${escapeHtml(series.name)}: ${latest.chapter.order}位</text>
        </g>
    ` : "";
    return `
      <g>
        <polyline points="${linePoints}" fill="none" stroke="${series.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        ${circles}
        ${latestLabel}
      </g>
    `;
  }).join("");

  const latestX = xFor(issues.length - 1);
  const latestGuide = `
    <line x1="${latestX}" y1="${pad.top - 16}" x2="${latestX}" y2="${pad.top + plotHeight}" class="latest-guide" />
    <rect x="${latestX - 28}" y="6" width="56" height="30" rx="3" class="latest-chip" />
    <text x="${latestX}" y="27" class="latest-chip-text">${escapeHtml(issueNumberDisplay(issues[issues.length - 1]))}号</text>
  `;

  const legend = seriesRows.map((series) => `
    <span><i style="background:${series.color}"></i>${escapeHtml(series.name)}</span>
  `).join("");

  els.orderComparisonChart.innerHTML = `
    <div class="rank-chart-scroll">
      <svg class="rank-line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="掲載順の折れ線グラフ">
        ${grid}
        ${latestGuide}
        ${seriesLines}
      </svg>
      <div class="rank-tooltip" id="rankTooltip" hidden></div>
    </div>
    <div class="rank-legend">${legend}</div>
    ${renderOrderTable(seriesRows, issues)}
  `;
  bindRankTooltip();
}

function renderOrderTable(seriesRows, issues) {
  const rows = seriesRows
    .map((series) => ({ series, stats: orderStats(series.id) }))
    .sort((a, b) => a.stats.avg - b.stats.avg);
  const header = issues.map((issue) => `<th>${escapeHtml(issueNumberDisplay(issue))}</th>`).join("");
  const body = rows.map((row, index) => {
    const cells = issues.map((issue) => {
      const chapter = state.chapters.find((item) => item.issueId === issue.id && item.seriesId === row.series.id);
      if (!chapter) return `<td>-</td>`;
      const className = chapter.colorTag === "巻頭カラー" ? "is-cover" : chapter.colorTag === "センターカラー" ? "is-center" : "";
      return `<td class="${className}">${isHiatus(chapter) ? "休" : chapter.order}</td>`;
    }).join("");
    const trendLabel = row.stats.trend > 0 ? `-${row.stats.trend}↑` : row.stats.trend < 0 ? `+${Math.abs(row.stats.trend)}↓` : "-";
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${trendLabel}</td>
        <td class="series-name-cell">${escapeHtml(row.series.name)}</td>
        ${cells}
        <td>${row.stats.avg ? row.stats.avg.toFixed(1) : "-"}</td>
      </tr>
    `;
  }).join("");
  return `
    <div class="rank-table-wrap">
      <table class="rank-table">
        <thead>
          <tr><th>#</th><th>変動</th><th>作品</th>${header}<th>平均</th></tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
    <div class="color-legend"><span class="cover"></span>巻頭カラー <span class="center"></span>センターカラー</div>
  `;
}

function bindRankTooltip() {
  const tooltip = els.orderComparisonChart.querySelector("#rankTooltip");
  if (!tooltip) return;
  els.orderComparisonChart.querySelectorAll(".rank-point").forEach((point) => {
    point.addEventListener("mouseenter", () => {
      tooltip.hidden = false;
      const tags = parseTooltipTags(point.dataset.tags);
      tooltip.innerHTML = `
        <strong>${escapeHtml(point.dataset.series || "")} ${escapeHtml(point.dataset.issue || "")}</strong>
        <span>${escapeHtml(point.dataset.order || "-")}位</span>
        <div class="tooltip-tags">${tags.length ? tags.map((tag) => `<b>${escapeHtml(tag)}</b>`).join("") : "<b>未分類</b>"}</div>
        <p>${escapeHtml(point.dataset.summary || "")}</p>
      `;
    });
    point.addEventListener("mousemove", (event) => {
      const rect = els.orderComparisonChart.querySelector(".rank-chart-scroll").getBoundingClientRect();
      tooltip.style.left = `${event.clientX - rect.left + 14}px`;
      tooltip.style.top = `${event.clientY - rect.top + 14}px`;
    });
    point.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
}

function parseTooltipTags(value) {
  try {
    const tags = JSON.parse(value || "[]");
    return Array.isArray(tags) ? tags : [];
  } catch {
    return [];
  }
}

function renderSeriesDetail() {
  if (!focusedSeriesId) {
    els.seriesDetailHero.innerHTML = "";
    els.seriesScoreTimeline.innerHTML = "";
    els.seriesTagBars.innerHTML = "";
    els.seriesHistoryList.innerHTML = "";
    return;
  }

  const series = findSeries(focusedSeriesId);
  const chapters = chaptersForSeries(focusedSeriesId)
    .sort((a, b) => issueSortValue(findIssue(a.issueId)) - issueSortValue(findIssue(b.issueId)));
  const logged = chapters.filter((chapter) => chapter.logged);
  const scores = logged.map((chapter) => Number(chapter.score)).filter((score) => score > 0);
  const avg = averageOrZero(scores);

  els.seriesDetailHero.innerHTML = `
    <div class="series-detail-mark" style="background:${series.color}"></div>
    <div>
      <p>Series focus</p>
      <h2>${escapeHtml(series.name)}</h2>
      <span>${escapeHtml(series.author || "作者未設定")} ・ ${escapeHtml(series.status)} ・ ${logged.length}件記録 ・ 平均評価 ${avg ? avg.toFixed(1) : "-"} ・ ${escapeHtml(formatRecentOrder(averageRecentOrder(series.id)))}</span>
    </div>
  `;
  els.seriesStatusSelect.value = series.status || "連載中";

  els.seriesScoreTimeline.innerHTML = chapters.map((chapter) => {
    const issue = findIssue(chapter.issueId);
    const score = Number(chapter.score) || 0;
    const height = score ? Math.max(10, score * 9) : 8;
    return `
      <div class="timeline-point" title="${escapeHtml(issueShortLabel(issue))}">
        <div class="timeline-bar" style="height:${height}%; background:${series.color}"></div>
        <span>${escapeHtml(issue.number)}</span>
      </div>
    `;
  }).join("") || `<div class="empty-state">まだ履歴がありません</div>`;

  const tagRows = countTags(logged);
  els.seriesTagBars.innerHTML = tagRows.length
    ? tagRows.map(([tag, count], index) => barItem(tag, count, Math.max(...tagRows.map((row) => row[1])), COLORS[index % COLORS.length])).join("")
    : `<div class="empty-state">タグ付きの記録がまだありません</div>`;

  els.seriesHistoryList.innerHTML = chapters
    .slice()
    .reverse()
    .map((chapter) => chapterCard(chapter, true))
    .join("") || `<div class="empty-state">まだログがありません</div>`;
}

function renderSettings() {
  const issue = currentIssue();
  const issueCount = state.issues.length;
  els.issueNote.innerHTML = `
    <p>現在の号: ${escapeHtml(issueDisplayTitle(issue))}。次号を作ると、現在の掲載作品がそのままコピーされ、話数は前回の入力値 +1 が初期値になります。</p>
    <p>登録済みの号: ${issueCount}件</p>
  `;
  els.seedNote.innerHTML = `
    <p>${escapeHtml(state.issues[0]?.sourceNote || "")}</p>
    <p>公開アプリ化するときは、公式画像や誌面本文を保存せず、ユーザー自身の読書ログとして扱う設計にします。</p>
  `;
}

function chapterCard(chapter, showIssue) {
  const series = findSeries(chapter.seriesId);
  const issue = findIssue(chapter.issueId);
  const tags = chapter.tags.length
    ? chapter.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")
    : `<span class="tag">未分類</span>`;
  return `
    <article class="chapter-card ${chapter.logged ? "is-logged" : ""} ${isHiatus(chapter) ? "is-hiatus" : ""} ${isInvalidAfterEnd(chapter) ? "is-invalid" : ""}" style="--series-color: ${series.color}">
      <div class="chapter-head">
        <div>
          <h3>${escapeHtml(series.name)} ${chapter.chapterNo ? `${escapeHtml(chapter.chapterNo)}話` : ""} ${chapter.title ? `「${escapeHtml(chapter.title)}」` : ""}</h3>
          <div class="chapter-meta">${showIssue ? `${escapeHtml(issueShortLabel(issue))} ・ ` : ""}掲載順 ${chapter.order} ・ ${chapter.colorTag ? `${escapeHtml(chapter.colorTag)} ・ ` : ""}反応 ${escapeHtml(MOODS[chapter.mood] || "-")} ・ 評価 ${chapter.score || "-"}/10</div>
          ${isInvalidAfterEnd(chapter) ? `<div class="warning-line">連載終了後の号にログがあります。消さずに要確認として残しています。</div>` : ""}
        </div>
        <div class="card-actions">
          <button class="small-button" data-action="edit" data-id="${chapter.id}">編集</button>
        </div>
      </div>
      <div class="tag-row">${tags}</div>
      <div class="chapter-notes">
        ${noteBox("起きたこと", chapter.summary)}
        ${noteBox("世間の反応", chapter.reaction)}
        ${noteBox("自分の感想", chapter.myThought)}
      </div>
    </article>
  `;
}

function noteBox(label, text) {
  return `
    <div class="note-box">
      <strong>${escapeHtml(label)}</strong>
      <p>${escapeHtml(text || "未記録")}</p>
    </div>
  `;
}

function saveSeries(event) {
  event.preventDefault();
  const form = new FormData(els.seriesForm);
  const name = String(form.get("name") || "").trim();
  if (!name) return;
  const now = new Date().toISOString();
  const series = {
    id: makeId("series"),
    name,
    author: String(form.get("author") || "").trim(),
    status: String(form.get("status") || "連載中"),
    color: COLORS[state.series.length % COLORS.length],
    firstSeenIssueId: currentIssue().id,
    currentPage: "",
    feature: "",
    memo: "",
    createdAt: now,
    updatedAt: now,
  };
  state.series.push(series);

  if (form.get("addToCurrentIssue")) {
    const chapter = makeBlankChapter(series.id, currentChapters().length + 1, currentIssue().id, {
      tags: series.status === "読切" ? ["読切"] : [],
      logged: false,
    });
    state.chapters.push(chapter);
    enforceIssueRules(currentIssue().id);
  }

  persist();
  els.seriesForm.reset();
  render();
}

function saveSeriesStatus() {
  if (!focusedSeriesId) return;
  const series = findSeries(focusedSeriesId);
  const status = els.seriesStatusSelect.value;
  series.status = status;
  series.updatedAt = new Date().toISOString();
  if (status === "連載終了") {
    series.endedIssueId ||= currentIssue().id;
  } else {
    series.endedIssueId = "";
  }
  persist();
  render();
}

function saveChapter(event) {
  event.preventDefault();
  const form = new FormData(els.chapterForm);
  const now = new Date().toISOString();
  const seriesId = String(form.get("seriesId"));
  const selectedTags = form.getAll("tags");
  const selectedColorTag = selectedTags.includes("センターカラー")
    ? "センターカラー"
    : selectedTags.includes("巻頭カラー")
      ? "巻頭カラー"
      : "";
  const base = state.chapters.find((chapter) => chapter.id === editingChapterId)
    || currentChapters().find((chapter) => chapter.seriesId === seriesId)
    || makeBlankChapter(seriesId, currentChapters().length + 1);

  const chapter = {
    ...base,
    seriesId,
    chapterNo: Number(form.get("chapterNo")) || "",
    title: String(form.get("title") || "").trim(),
    summary: String(form.get("summary") || "").trim(),
    colorTag: selectedColorTag,
    tags: selectedTags,
    mood: String(form.get("mood")),
    reaction: String(form.get("reaction") || "").trim(),
    myThought: String(form.get("myThought") || "").trim(),
    prediction: String(form.get("prediction") || "").trim(),
    score: Number(form.get("score")) || 0,
    logged: true,
    updatedAt: now,
  };
  if (isHiatus(chapter)) {
    chapter.summary ||= "休載";
    chapter.mood = "quiet";
  }

  if (state.chapters.some((item) => item.id === chapter.id)) {
    state.chapters = state.chapters.map((item) => item.id === chapter.id ? chapter : item);
  } else {
    state.chapters.push(chapter);
  }

  enforceIssueRules(currentIssue().id);
  persist();
  cancelEdit();
  render();
}

function handleTocClick(event) {
  if (suppressNextClick) return;
  const item = event.target.closest(".toc-item");
  if (!item) return;
  const chapter = state.chapters.find((row) => row.id === item.dataset.id);
  if (chapter) startEdit(chapter);
}

function handleChapterClick(event) {
  const button = event.target.closest("button[data-action='edit']");
  if (!button) return;
  const chapter = state.chapters.find((item) => item.id === button.dataset.id);
  if (chapter) startEdit(chapter);
}

function handleSeriesClick(event) {
  const card = event.target.closest(".series-card");
  if (!card) return;
  focusedSeriesId = card.dataset.id;
  activeScreen = "series-detail";
  render();
}

function startEdit(chapter) {
  editingChapterId = chapter.id;
  els.logFormTitle.textContent = chapter.logged ? "掲載話を編集" : "掲載話を記録";
  els.saveChapterButton.textContent = chapter.logged ? "更新する" : "記録する";
  els.chapterForm.elements.seriesId.value = chapter.seriesId;
  els.chapterForm.elements.chapterNo.value = chapter.chapterNo || "";
  els.chapterForm.elements.title.value = chapter.title || "";
  els.chapterForm.elements.summary.value = chapter.summary || "";
  els.chapterForm.elements.mood.value = chapter.mood || "quiet";
  els.chapterForm.elements.score.value = chapter.score || 7;
  els.chapterForm.elements.reaction.value = chapter.reaction || "";
  els.chapterForm.elements.myThought.value = chapter.myThought || "";
  els.chapterForm.elements.prediction.value = chapter.prediction || "";
  els.chapterForm.querySelectorAll("input[name='tags']").forEach((input) => {
    input.checked = chapter.tags.includes(input.value);
  });
  updateScoreLabel();
  els.logOverlay.hidden = false;
  document.body.classList.add("modal-open");
}

function cancelEdit() {
  editingChapterId = null;
  els.chapterForm.reset();
  els.chapterForm.querySelectorAll("input[name='tags']").forEach((input) => {
    input.checked = false;
  });
  els.logFormTitle.textContent = "掲載話を記録";
  els.saveChapterButton.textContent = "記録する";
  updateScoreLabel();
  els.logOverlay.hidden = true;
  document.body.classList.remove("modal-open");
}

function updateScoreLabel() {
  els.scoreValue.textContent = `${els.scoreInput.value}/10`;
}

function createNextIssue() {
  const previousIssue = currentIssue();
  const previousChapters = currentChapters().sort((a, b) => a.order - b.order);
  const previousNumber = Number(String(previousIssue.merged && previousIssue.numberEnd ? previousIssue.numberEnd : previousIssue.number).replace(/\D/g, "")) || state.issues.length;
  const nextNumber = previousNumber + 1;
  const nextIssueId = uniqueIssueId(previousIssue.year, nextNumber);
  const nextIssue = {
    id: nextIssueId,
    year: previousIssue.year,
    number: String(nextNumber),
    numberEnd: "",
    merged: false,
    label: `Weekly Manga Issue ${nextNumber} (${previousIssue.year})`,
    date: "",
    sourceNote: `${issueShortLabel(previousIssue)} から作品と前回話数を引き継いだ号です。`,
  };

  const copiedSeriesIds = new Set();
  const nextChapters = [];
  previousChapters.forEach((chapter) => {
    const series = findSeries(chapter.seriesId);
    copiedSeriesIds.add(chapter.seriesId);
    if (shouldCarryToNextIssue(series)) {
      nextChapters.push(makeBlankChapter(chapter.seriesId, nextChapters.length + 1, nextIssueId, {
      chapterNo: incrementChapterNumber(chapter.chapterNo),
      page: chapter.page,
      colorTag: nextChapters.length === 0 ? "巻頭カラー" : "",
      tags: nextChapters.length === 0 ? ["巻頭カラー"] : [],
      }));
    }
  });

  state.series.forEach((series) => {
    if (copiedSeriesIds.has(series.id)) return;
    if (!shouldCarryToNextIssue(series)) return;
    nextChapters.push(makeBlankChapter(series.id, nextChapters.length + 1, nextIssueId, {
      chapterNo: "",
      page: series.currentPage || "",
      colorTag: nextChapters.length === 0 ? "巻頭カラー" : "",
      tags: [],
    }));
  });

  state.issues.push(nextIssue);
  state.chapters.push(...nextChapters);
  state.currentIssueId = nextIssueId;
  enforceIssueRules(nextIssueId);
  persist();
  cancelEdit();
  activeScreen = "current";
  render();
}

function handleDragStart(event) {
  const item = event.target.closest(".toc-item");
  if (!item) return;
  draggedChapterId = item.dataset.id;
  item.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedChapterId);
}

function handleDragOver(event) {
  if (!draggedChapterId) return;
  event.preventDefault();
  const item = event.target.closest(".toc-item");
  document.querySelectorAll(".toc-item").forEach((row) => row.classList.remove("is-drop-target"));
  if (item && item.dataset.id !== draggedChapterId) item.classList.add("is-drop-target");
}

function handleDrop(event) {
  if (!draggedChapterId) return;
  event.preventDefault();
  const target = event.target.closest(".toc-item");
  if (target && target.dataset.id !== draggedChapterId) {
    reorderChapters(draggedChapterId, target.dataset.id);
    suppressNextClick = true;
    setTimeout(() => {
      suppressNextClick = false;
    }, 80);
  }
  handleDragEnd();
}

function handleDragEnd() {
  draggedChapterId = "";
  document.querySelectorAll(".toc-item").forEach((row) => {
    row.classList.remove("is-dragging", "is-drop-target");
  });
}

function reorderChapters(sourceId, targetId) {
  const current = currentChapters().sort((a, b) => a.order - b.order);
  const sourceIndex = current.findIndex((chapter) => chapter.id === sourceId);
  const targetIndex = current.findIndex((chapter) => chapter.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0) return;
  const [moved] = current.splice(sourceIndex, 1);
  current.splice(targetIndex, 0, moved);
  current.forEach((chapter, index) => {
    chapter.order = index + 1;
  });
  enforceIssueRules(currentIssue().id);
  state.chapters = state.chapters.map((chapter) => {
    const updated = current.find((row) => row.id === chapter.id);
    return updated || chapter;
  });
  persist();
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `manga-issue-log-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const data = normalizeState(JSON.parse(String(reader.result)));
      state = data;
      persist();
      render();
    } catch {
      alert("読み込めないJSONです。エクスポートしたデータ形式か確認してください。");
    } finally {
      event.target.value = "";
    }
  });
  reader.readAsText(file);
}

function resetData() {
  if (!confirm("現在のローカルデータを消して、画像から作った仮データに戻しますか？")) return;
  state = structuredClone(starterData);
  persist();
  cancelEdit();
  focusedSeriesId = "";
  activeScreen = "current";
  render();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return normalizeState(JSON.parse(raw));
  } catch {
    localStorage.removeItem(STORE_KEY);
  }
  const data = structuredClone(starterData);
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  return data;
}

function normalizeState(data) {
  if (!Array.isArray(data.issues) || !Array.isArray(data.series) || !Array.isArray(data.chapters)) {
    throw new Error("Invalid state shape");
  }
  data.currentIssueId ||= data.issues[0]?.id;
  data.customTags ||= [];
  data.issues = data.issues.map((issue) => ({
    numberEnd: "",
    merged: false,
    ...issue,
  }));
  data.series = data.series.map((series) => ({
    status: "連載中",
    endedIssueId: "",
    ...series,
  }));
  data.chapters = data.chapters.map((chapter, index) => ({
    page: "",
    order: index + 1,
    colorTag: "",
    statusFlags: [],
    chapterNo: "",
    title: "",
    summary: "",
    tags: [],
    mood: "quiet",
    reaction: "",
    myThought: "",
    prediction: "",
    score: 0,
    logged: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...chapter,
  }));
  data.issues.forEach((issue) => {
    const issueChapters = data.chapters.filter((chapter) => chapter.issueId === issue.id).sort((a, b) => a.order - b.order);
    const active = issueChapters.filter((chapter) => !(chapter.tags || []).includes("休載"));
    const hiatus = issueChapters.filter((chapter) => (chapter.tags || []).includes("休載"));
    [...active, ...hiatus].forEach((chapter, index) => {
      chapter.order = index + 1;
    });
    normalizeColorTags(active);
    hiatus.forEach((chapter) => {
      chapter.colorTag = "";
      chapter.tags = [...new Set([...(chapter.tags || []), "休載"])].filter((tag) => tag !== "巻頭カラー");
    });
  });
  return data;
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function currentIssue() {
  return findIssue(state.currentIssueId) || state.issues[0];
}

function currentChapters() {
  return state.chapters.filter((chapter) => chapter.issueId === currentIssue().id);
}

function chaptersForSeries(seriesId) {
  return state.chapters.filter((chapter) => chapter.seriesId === seriesId);
}

function findIssue(id) {
  return state.issues.find((issue) => issue.id === id) || state.issues[0];
}

function findSeries(id) {
  return state.series.find((series) => series.id === id) || {
    name: "不明な作品",
    author: "",
    color: "#d54435",
  };
}

function sortedIssues() {
  return [...state.issues].sort((a, b) => issueSortValue(b) - issueSortValue(a));
}

function issueSortValue(issue) {
  const raw = issue?.merged && issue?.numberEnd ? issue.numberEnd : issue?.number;
  const number = Number(String(raw || "").replace(/\D/g, "")) || 0;
  return (Number(issue?.year) || 0) * 1000 + number;
}

function issueShortLabel(issue) {
  return `${issue.year}年${issueNumberDisplay(issue)}号`;
}

function issueNumberDisplay(issue) {
  return issue?.merged && issue?.numberEnd ? `${issue.number}・${issue.numberEnd}` : String(issue?.number || "");
}

function issueDisplayTitle(issue) {
  return `Weekly Manga Issue ${issueNumberDisplay(issue)} (${issue.year})`;
}

function currentOrderForSeries(seriesId) {
  return currentChapters().find((chapter) => chapter.seriesId === seriesId)?.order || 999;
}

function makeBlankChapter(seriesId, order, issueId = currentIssue().id, overrides = {}) {
  const now = new Date().toISOString();
  const series = findSeries(seriesId);
  return {
    id: `chapter-${seriesId}-${issueId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    issueId,
    seriesId,
    chapterNo: "",
    title: "",
    page: series.currentPage || "",
    order,
    colorTag: order === 1 ? "巻頭カラー" : "",
    summary: "",
    tags: order === 1 ? ["巻頭カラー"] : [],
    mood: "quiet",
    reaction: "",
    myThought: "",
    prediction: "",
    score: 0,
    logged: false,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function enforceIssueRules(issueId) {
  const chapters = state.chapters
    .filter((chapter) => chapter.issueId === issueId)
    .sort((a, b) => a.order - b.order);
  const active = chapters.filter((chapter) => !isHiatus(chapter));
  const hiatus = chapters.filter(isHiatus);
  [...active, ...hiatus].forEach((chapter, index) => {
    chapter.order = index + 1;
  });
  normalizeColorTags(active);
  hiatus.forEach((chapter) => {
    chapter.colorTag = "";
    chapter.tags = [...new Set([...(chapter.tags || []), "休載"])].filter((tag) => tag !== "巻頭カラー");
  });
}

function normalizeColorTags(chapters) {
  chapters.forEach((chapter, index) => {
    const tags = new Set(chapter.tags || []);
    tags.delete("巻頭カラー");
    if (index === 0) {
      chapter.colorTag = "巻頭カラー";
      tags.add("巻頭カラー");
    } else if (chapter.colorTag === "巻頭カラー") {
      chapter.colorTag = "";
    }
    if (!chapter.colorTag && tags.has("センターカラー")) {
      chapter.colorTag = "センターカラー";
    }
    if (chapter.colorTag) tags.add(chapter.colorTag);
    chapter.tags = [...tags];
  });
}

function shouldCarryToNextIssue(series) {
  return series.status !== "連載終了" && series.status !== "読切";
}

function isHiatus(chapter) {
  return (chapter.tags || []).includes("休載");
}

function isInvalidAfterEnd(chapter) {
  const series = findSeries(chapter.seriesId);
  if (series.status !== "連載終了" || !series.endedIssueId) return false;
  return issueSortValue(findIssue(chapter.issueId)) > issueSortValue(findIssue(series.endedIssueId));
}

function averageRecentOrder(seriesId, limit = 8) {
  const rows = chaptersForSeries(seriesId)
    .filter((chapter) => !isHiatus(chapter))
    .sort((a, b) => issueSortValue(findIssue(b.issueId)) - issueSortValue(findIssue(a.issueId)))
    .slice(0, limit);
  return {
    avg: rows.length ? average(rows.map((chapter) => Number(chapter.order) || 0)) : 0,
    count: rows.length,
    limit,
  };
}

function orderStats(seriesId, limit = 8) {
  const rows = chaptersForSeries(seriesId)
    .filter((chapter) => !isHiatus(chapter))
    .sort((a, b) => issueSortValue(findIssue(b.issueId)) - issueSortValue(findIssue(a.issueId)))
    .slice(0, limit);
  const latest = Number(rows[0]?.order) || 0;
  const previous = Number(rows[1]?.order) || 0;
  return {
    avg: rows.length ? average(rows.map((chapter) => Number(chapter.order) || 0)) : 0,
    count: rows.length,
    latest,
    trend: latest && previous ? previous - latest : 0,
  };
}

function formatRecentOrder(result) {
  if (!result || !result.count) return "直近8週 記録なし";
  const prefix = result.count < result.limit ? `直近${result.count}/${result.limit}週` : "直近8週";
  return `${prefix} 平均${result.avg.toFixed(1)}位`;
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function updateMergedIssue(merged) {
  const issue = currentIssue();
  issue.merged = merged;
  issue.numberEnd = merged ? String((Number(issue.number) || 0) + 1) : "";
  issue.label = issueDisplayTitle(issue);
  persist();
  render();
}

function uniqueIssueId(year, number) {
  let id = `issue-${year}-${number}`;
  let suffix = 2;
  while (state.issues.some((issue) => issue.id === id)) {
    id = `issue-${year}-${number}-${suffix}`;
    suffix += 1;
  }
  return id;
}

function incrementChapterNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric + 1 : "";
}

function chapterSearchText(chapter) {
  const series = findSeries(chapter.seriesId);
  const issue = findIssue(chapter.issueId);
  return [
    issueShortLabel(issue),
    series.name,
    series.author,
    chapter.title,
    chapter.summary,
    chapter.reaction,
    chapter.myThought,
    chapter.prediction,
    chapter.tags.join(" "),
  ].join(" ").toLowerCase();
}

function countTags(chapters) {
  const counts = new Map();
  chapters.forEach((chapter) => {
    chapter.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"));
}

function barItem(label, value, max, color) {
  const numericValue = Number(value);
  const width = max ? Math.max(6, Math.min(100, Math.round((numericValue / max) * 100))) : 0;
  return `
    <div class="bar-item">
      <div class="bar-label"><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${width}%; --bar-color:${color}"></div></div>
    </div>
  `;
}

function coverageRow(label, count, total) {
  return `
    <div class="coverage-row">
      <span>${escapeHtml(label)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round((count / total) * 100)}%; --bar-color:var(--red)"></div></div>
      <strong>${count}/${total}</strong>
    </div>
  `;
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function averageOrZero(values) {
  return values.length ? average(values) : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
