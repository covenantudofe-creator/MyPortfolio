import { useState } from 'react'
import { assetPath } from '../utils/assetPath.js'

export default function ProfilePortrait() {
  const [available, setAvailable] = useState(true)

  return (
    <div className="about-art portrait-frame">
      {available ? (
        <img
          src={assetPath('/images/profile-photo.jpg')}
          alt="Portrait of Godscovenant Patrick Udofe"
          loading="lazy"
          onError={() => setAvailable(false)}
        />
      ) : (
        <div className="portrait-placeholder" role="img" aria-label="Profile photo placeholder. Add your portrait as public/images/profile-photo.jpg.">
          <div className="about-monogram">G<span>U</span></div>
          <span className="about-art-caption">ADD PORTRAIT AT /images/profile-photo.jpg</span>
        </div>
      )}
    </div>
  )
}
