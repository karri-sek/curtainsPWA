import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/'
import styled from 'styled-components'
import CurtainLogo from '../components/CurtainLogo'
import ThreeD from '../components/ThreeD'
import PDFLogo from '../components/PDFLogo'
import Video from '../components/Video'
import Degree from '../components/Degree'
import PrismicLogo from '../components/PrismicLogo'
import OverlayModel from '../components/overlayModel'
import VideoOverlay from '../components/videoOverlay'
import ThreeDOverlay from '../components/threeDOverlay'
import PdfCarousel from '../components/pdfCarousel'
import Wrapper from '../components/wrapper'
import Description from '../components/description'
import DegreeOverlay from '../components/DegreeOverlay'
import EmptyOverlayModel from '../components/emptyOverlayModel'
import Metadata from '../components/metadata'
import LeftMenu from '../components/menu/leftMenu'
import RightMenu from '../components/menu/rightMenu'
import logo from '../files/prismic.png'
import {
  getWebsiteHeaderData,
  getPDFSlice,
  getPDFDocuments,
  getVideoMapSlice,
  getSocialUrls,
  getMenuData,
  getWebsiteMeta
} from '../utils/index'
import '../globalStyles.css'
import '../portret.css'
import '../socialIcons.css'
import '../hamburgers.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const FooterLine = styled.img`
  left: 5%;
  bottom: 10%;
  width: 80%;
  height: 0.3%;
  position: absolute;
  outline: none;
`

const IndexPage = props => {
  const { data } = props
  const websiteHeaderData = getWebsiteHeaderData(data)
  const pdfSlice = getPDFSlice(data)
  const  pdfDocuments = getPDFDocuments(data)
  const videoMapSlice = getVideoMapSlice(data)
  const socialURLs = getSocialUrls(data)
  const menuData = getMenuData(data)
  const websiteMeta = getWebsiteMeta(data)

  const [open, setOpen] = React.useState(false)
  const [openVideOverlay, setVideoOverlay] = React.useState(false)
  const [openthreeDOverlay, setThreeDOverlay] = React.useState(false)
  const [showEmptyOverlay, setShowEmptyOverlay] = React.useState(false)
  const [openPdfOverlay, setPdfOverlay] = React.useState(false)
  const [openDegreeOverlay, setOpenDegreeOverlay] = React.useState(false)
  
 
  return (
    <Layout>
      <Metadata
        websiteMeta={websiteMeta}
      />
      <Wrapper bgurl={websiteHeaderData.backgroundImage}>
        {!open && (
          <LeftMenu
          src={menuData.menu_left_icon.url}
          type="image"
          onClick={() => setOpen(!open)}
        />
        )}
        {!showEmptyOverlay && !open && (
          <RightMenu
          src={menuData.menu_right_icon.url}
          type="image"
          onClick={() => setShowEmptyOverlay(!showEmptyOverlay)}
          ></RightMenu>
        )}
        <CurtainLogo src={websiteHeaderData.logoImage} type="image" />
        <Description desc={websiteHeaderData.logoDescription} />
        <ThreeD
          src={videoMapSlice.three_d_model_image.url}
          type="image"
          value=""
          onClick={() => setThreeDOverlay(!openthreeDOverlay)}
        />
        <PDFLogo
          src={pdfSlice.pdf_image.url}
          type="image"
          value=""
          onClick={() => setPdfOverlay(!openPdfOverlay)}
        />
        <Video
          src={videoMapSlice.video_image.url}
          type="image"
          value=""
          onClick={() => setVideoOverlay(!openVideOverlay)}
        />
        {/* 360 degree which is not embed html*/}
        <Degree
          src={videoMapSlice.three_sixty_degree_image.url}
          type="image"
          value=""
          onClick={() => setOpenDegreeOverlay(!openDegreeOverlay)}
        />
        <PrismicLogo src={websiteHeaderData.footerImage} type="image" value="" onclick="" />
        <FooterLine src={websiteHeaderData.footerLineImage} />
      </Wrapper>

      {openDegreeOverlay && (
        <DegreeOverlay
          removeOverlay={() => {
            setOpenDegreeOverlay(!openDegreeOverlay)
          }}
          data={videoMapSlice}
        />
      )}
      {open && (
        <OverlayModel
          removeOverlay={() => setOpen(!open)}
          socialURLs={socialURLs}
        />
      )}

      {showEmptyOverlay && (
        <EmptyOverlayModel
          removeOverlay={() => setShowEmptyOverlay(!showEmptyOverlay)}
        />
      )}

      {openthreeDOverlay && (
        <ThreeDOverlay
          data={videoMapSlice}
          removeOverlay={() => setThreeDOverlay(!openthreeDOverlay)}
        />
      )}
      {openVideOverlay && (
        <VideoOverlay
          data={videoMapSlice}
          removeOverlay={() => setVideoOverlay(!openVideOverlay)}
        />
      )}
      {openPdfOverlay && (
        <PdfCarousel
          documents={pdfDocuments}
          removeOverlay={() => setPdfOverlay(!openPdfOverlay)}
        />
      )}
    </Layout>
  )
}
export default IndexPage

export const pageQuery = graphql`
  query($uid: String) {
    prismicBlogpost(uid: { eq: $uid }) {
      uid
      data {
        website_main_logo {
          alt
          url
        }
        name {
          html
          text
        }
        website_background_image {
          alt
          url
        }
        footer_line_image {
          alt
          url
        }
        footer_image{
          alt
          url
        }
        logo_description {
          text
        }
        body {
          ... on PrismicBlogpostBodyPdfslice {
            primary {
              document_1 {
                url
                name
              }
              document_2 {
                url
                name
              }
              document_3 {
                url
                name
              }
              pdf_image {
                  url
                  alt
              }
            }
          }
          ... on PrismicBlogpostBodyVideoMapSlice {
            primary {
              three_sixty_degree_url {
                url
              }
              three_sixty_degree_image {
                url
                alt
              }
              video_url{
                embed_url
                html
              }
              video_image {
                  url
                  alt
              }
              three_d_model_image {
                  url
                  alt
              }
              three_d_model_embed_url{
                html
                embed_url
              }
            }
          }
          ... on PrismicBlogpostBodySocial {
            primary {
            instagram_url {
                url
            }
            instagram_icon{
                url
                alt
            }
              facebook_url {
                url
              }
              facebook_icon {
                url
                alt
              }
              linkedin_url {
                url
              }
              linked_in_icon {
                url
                alt
              }
              whatsapp_url {
                url
              }
              whatsapp_icon {
                url
                alt
              }
              mail_url {
                url
              }
              mail_icon {
                url
              }
              phone_number {
                  text
              }
              phone_icon {
                  url
              }
              location_url{
                  url
              }
              location_icon {
                  url
              }
              website_url {
                  url
              }
              website_icon {
                  url
              }
            }
          }
          ... on PrismicBlogpostBodyMenu {
            primary {
              menu_left_icon_bgcolor
              menu_left_icon {
                url
              }
              menu_right_icon_bgcolor
              menu_right_icon{
                  url
              }
            }
          }
          ... on PrismicBlogpostBodyWebsitemeta {
            primary {
              title {
                text
              }
              description {
                text
              }
              meta_link_share_image{
                url
              }
            }
          }
        }
      }
    }
  }
`
