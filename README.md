<h1>Dev.to Rater</h1>
<div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
<img src="https://img.shields.io/github/stars/perisicnikola37/dev-to-post-rater" alt="GitHub Repo stars" />
<img src="https://img.shields.io/github/license/perisicnikola37/dev-to-post-rater" alt="GitHub License" />
<img src="https://img.shields.io/github/issues/perisicnikola37/dev-to-post-rater" alt="GitHub Issues" />
<img src="https://img.shields.io/github/commit-activity/m/perisicnikola37/dev-to-post-rater" alt="Commit Activity" />
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/perisicnikola37/dev-to-rater">
</div>

<img src="https://github.com/user-attachments/assets/82ae90a3-df52-48a9-9e43-1c8c4f5ceeb9" height="auto" width="450px" />

## Documentation

For detailed documentation, please visit the [Dev.to Rater Documentation](http://147.79.101.61:3000/).

## About

**Dev.to Rater** is a powerful tool that analyzes your post content, such as headings, paragraphs, images, and links, to help enhance the readability and engagement of your content. This tool ultimately drives greater audience growth and interaction, making your posts more <ins>impactful</ins> and <ins>engaging</ins>.

## Available calculations

1. **Sentence Length**  
   If a sentence contains more than 15 words, it receives a lower readability score. Long sentences can make the content harder to read and understand, so reducing sentence length improves overall readability and engagement.

2. **Paragraph Length**  
   Similarly, the tool evaluates the length of each paragraph. If a paragraph exceeds a certain number of words (150 words), the score decreases.

3. **Emoji Usage**  
   Emojis can enhance the engagement of your content, but overuse can negatively impact readability. **Dev.to Rater** calculates the number of emojis in each sentence. If a sentence contains more than 2 emojis, the score decreases.

4. **Headings Structure**  
   The tool analyzes the structure and distribution of headings (e.g., `h1`, `h2`, `h3`). If headings are improperly used (e.g., no `h2` after `h1`, missing subheadings), the score will decrease.

5. **Image Alt Text**  
   The tool checks if all images have descriptive alt text. If an image has missing alt text, it will decrease the score.

Detailed calculations core logic can be found [here](http://147.79.101.61:3000/api-reference/introduction).

## Overall Engagement Score Calculation

Once all individual features are evaluated, **Dev.to Rater** calculates the overall engagement score. The maximum possible score is **10 points**, and the tool provides feedback on areas to improve.

**Score Range:**

- **9-10:** Outstanding post, highly engaging and optimized for readability and interaction.
- **7-9:** Good post with minor areas of improvement.
- **5-7:** Average post, requires some adjustments.
- **<5:** Needs significant improvements in structure, engagement, or clarity to effectively reach the audience.

<div style="margin-top: 40px; text-align: center;">
    <h2>Top Authors Using Our Tool</h2>
    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
        <a href="https://dev.to/perisicnikola37" target="_blank" style="display: inline-block;">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQFWAUzeVptBNw/profile-displayphoto-shrink_800_800/B4DZSNHQMkHYAc-/0/1737534276890?e=1743638400&v=beta&t=cXqowTbSWLNxCZ9Z67hZRueNC9fowRveMxRsgt4aNX0" 
                 alt="Nikola Perišić" 
                 style="border-radius: 50%; width: 40px; height: 40px;" />
        </a>
    </div>
</div>
