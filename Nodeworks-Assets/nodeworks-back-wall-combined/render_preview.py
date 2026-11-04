import os
os.environ['PYOPENGL_PLATFORM']='egl'
import numpy as np
np.infty=np.inf
import pyrender,trimesh
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
p=Path(__file__).parent
ts=trimesh.load(p/'nodeworks-back-wall-combined.glb',force='scene')
sc=pyrender.Scene.from_trimesh_scene(ts,bg_color=[.97,.98,1.,1.],ambient_light=[.32,.33,.37])
def pose(eye,target):
 z=np.array(eye,dtype=float)-np.array(target);z/=np.linalg.norm(z);x=np.cross([0,1,0],z);x/=np.linalg.norm(x);y=np.cross(z,x)
 m=np.eye(4);m[:3,:3]=np.array([x,y,z]).T;m[:3,3]=eye;return m
for eye,intensity in [([-3,6,-6],1.8),([5,4,-3],1.1),([0,5,3],1.0)]:
 sc.add(pyrender.DirectionalLight(color=[1.,1.,1.],intensity=intensity),pose=pose(eye,[0,1.3,0]))
# Preview lighting illustrates the warmth of the emissive shelf strips.
for x in [1.835,-1.835]:
 for z in [1.22,1.85,2.50]:
  m=np.eye(4);m[:3,3]=[x,z,-.18]
  sc.add(pyrender.PointLight(color=[1.,.79,.46],intensity=.32,range=.75),pose=m)
r=pyrender.OffscreenRenderer(1800,1200)
f='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
for label,eye,target,xmag,ymag in [('preview',[.65,2.8,-9.0],[0,1.32,.0],2.89,1.9267),('front',[0,1.35,-9],[0,1.35,0],2.89,1.9267)]:
 node=sc.add(pyrender.OrthographicCamera(xmag=xmag,ymag=ymag),pose=pose(eye,target))
 color,_=r.render(sc,flags=0)
 im=Image.fromarray(color);d=ImageDraw.Draw(im)
 d.text((62,42),'NODEWORKS / BACK WALL ASSEMBLY',font=ImageFont.truetype(f,31),fill='#10234a')
 d.text((62,88),'Wall · Cabinets · Shelves · Whiteboard · Attached accessories',font=ImageFont.truetype(f,20),fill='#67748e')
 im.save(p/('nodeworks-back-wall-'+label+'.png'));sc.remove_node(node)
r.delete()
