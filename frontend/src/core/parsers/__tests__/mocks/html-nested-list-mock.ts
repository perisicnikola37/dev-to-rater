export const htmlNestedListResponseMock = `
<html>
  <body>
    <article data-article-id="12345">
      <!-- This is the required class -->
      <div class="crayons-article__body">
        <ul>
          <li>First Item</li>
          <li>Second Item
            <ul>
              <li>Nested Item 1</li>
              <li>Nested Item 2</li>
            </ul>
          </li>
        </ul>
      </div>
    </article>
  </body>
</html>
`
