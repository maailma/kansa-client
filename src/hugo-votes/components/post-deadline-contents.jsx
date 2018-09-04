import { Card, CardText } from 'material-ui/Card'
import React from 'react'

const PostDeadlineContents = () => (
  <Card>
    <CardText className="vote-intro" style={{ padding: '16px 32px' }}>
      <h3>
        Thank you for having participated in the 2019 Hugo Awards and the John
        W. Campbell Award!
      </h3>

      <p>
        The Hugo Award is the leading award for excellence in the field of
        science fiction and fantasy. The Hugo Awards are awarded each year by
        the World Science Fiction Society (“WSFS”), at the World Science Fiction
        Convention (“Worldcon”). The finalists for the 2019 Hugo Awards and John
        W. Campbell Award for Best New Writer were announced on XX 2019.
      </p>
      <p>The deadline for voting has now passed.</p>
      <p>
        The Hugo Awards will be presented at a formal ceremony on XX 
        August 2019, at Dublin 2019, an Irisn Worldcon,
        in Dublin, Ireland. We currently plan to continue the recent tradition
        of streaming the ceremony live via the Internet, enabling fans around
        the world to experience the event.
      </p>
      <p>
        The official website of the Hugo Awards is{' '}
        <a href="http://thehugoawards.org/" target="_blank">
          thehugoawards.org
        </a>
        , where you can find the full history of the Hugo Awards as well as the
        names of past finalists and winners, information about the voting
        process, a gallery of past trophy designs, and more.
      </p>
    </CardText>
  </Card>
)

export default PostDeadlineContents
