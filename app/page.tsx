'use client'
import React, { useState } from 'react'
export default function Home() {
  const [request, setRequest] = useState<{content?: string, subject?: string,parsing?: string}>({})
  let [itinerary, setItinerary] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  async function hitAPI() {
    if (!request.content) return
    setMessage('AI老师正在读题...')
    setLoading(true)
    setItinerary('')

    setTimeout(() => {
      setMessage('AI老师正在解题 ...')
    }, 7000)

    setTimeout(() => {
      setMessage('如果长时间未响应，请稍后再试 ...')
    }, 15000)
    try{
      const response = await fetch('/api/get-itinerary', {
        method: 'POST',
        body: JSON.stringify({
          content: request.content,
          subject: request.subject,
          parsing : request.parsing
        })
      })
      const json = await response.json()
      
      // const response2 = await fetch('/api/get-points-of-interest', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     pointsOfInterestPrompt: json.pointsOfInterestPrompt,
      //   })
      // })
      // const json2 = await response2.json()
  
      // let pointsOfInterest = JSON.parse(json2.pointsOfInterest)
      let itinerary = json.itinerary
  
      // console.log('pointsOfInterest: ', pointsOfInterest)
      // pointsOfInterest.map(point => {
      //   // itinerary = itinerary.replace(point, `<a target="_blank" rel="no-opener" href="https://www.google.com/search?q=${encodeURIComponent(point + ' ' + request.subject)}">${point}</a>`)
      //   itinerary = itinerary.replace(point, `[${point}](https://www.baidu.com/s?wd=${encodeURIComponent(point + ' ' + request.subject)})`)
      // })
  
      setItinerary(itinerary)
      setLoading(false)
    }catch (err) {
      alert('AI老师正在忙，请稍后再试一次')
      console.log('error: ', err)
    }
  }
  // let content = itinerary.split('第')
  // console.log(itinerary)
  // if (content.length > 1) {
  //   content.shift()
  // } else {
  //   content[0] = "1" + content[0]
  // }
  // console.log(request)
  return (
    <main>
      <div className="app-container">
        <h1 style={styles.header}>'爱提问' 你的人工智能老师</h1>
        <div style={styles.formContainer} className="form-container">
          {/* <input style={styles.input}  placeholder="想去旅游的城市" onChange={e => setRequest(request => ({
            ...request, subject: e.target.value
          }))} /> */}
          <select style={styles.input} name="subject" onChange={e => setRequest(request => ({
            ...request, subject: e.target.value
          }))}>
            <option value="生物">生物</option>
            <option value="物理">物理</option>
            <option value="数学">数学</option>
            <option value="化学">化学</option>
            <option value="英语">英语</option>
            <option value="计算机">计算机</option>
            <option value="地理">地理</option>
          </select >
          <input style={styles.input} placeholder="问题内容，建议复制粘贴" onChange={e => setRequest(request => ({
            ...request, content: e.target.value
          }))} />
          <select style={styles.input} name="parsing" onChange={e => setRequest(request => ({
            ...request, parsing: e.target.value
          }))}>
            <option value="不需要">不需要详细解析</option>
            <option value="需要">需要详细解析</option>
          </select >
          {/* <input style={styles.input} placeholder="是否需要详细解析" onChange={e => setRequest(request => ({
            ...request, parsing: e.target.value
          }))} />           */}
          <button className="input-button"  onClick={hitAPI}>开始你的提问</button>
        </div>
        <div className="results-container">
        {
          loading && (
            <p>{message}</p>
          )
        }
        {
          itinerary && <div style={styles.content} >{itinerary}</div>
        }

        </div>
      </div>
    </main>
  )
}

const styles = {
  header: {
    textAlign: 'center' as 'center',
    marginTop: '80px',
    color: '#c683ff',
    fontSize: '44px'
  },
  input: {
    padding: '10px 14px',
    marginBottom: '4px',
    outline: 'none',
    fontSize: '16px',
    width: '100%',
    borderRadius: '8px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    margin: '30px auto 0px',
    padding: '20px',
    boxShadow: '0px 0px 12px rgba(198, 131, 255, .2)',
    borderRadius: '10px'
  },
  result: {
    color: 'white'
  },
  content:{
    marigin:'0 auto',
    color:'white'
  }

}
