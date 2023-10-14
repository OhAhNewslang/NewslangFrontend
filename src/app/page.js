export default function Home() {
    const subres = fetch('/api/news/subscribe');
    const subnews = subres.json();
    const liveres = fetch('/api/news/live?page=~');
    const livenews = liveres.json();
  
  return (
    <div className="wrapex">
      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#구독</h3>
        </div>

        <div className="tableWrap2">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '65%' }} />
              <col style={{ width: '15%' }} />

            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  subnews.map((news) => {
                    return (
                      <div>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl"><a href={news.url}>{news.title}</a></td>
                        <td>{news.media}</td>
                      </div>
                    )
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#최신 뉴스</h3>
        </div>
        <div className="tableWrap">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '65%' }} />
              <col style={{ width: '15%' }} />

            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {
                  livenews.map((news) => {
                    return (
                      <div>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl"><a href={news.url}>{news.title}</a></td>
                        <td>{news.media}</td>
                      </div>
                    )
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}
