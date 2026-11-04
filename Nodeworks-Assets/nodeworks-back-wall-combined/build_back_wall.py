from pathlib import Path
import math,json
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial
from trimesh.visual import TextureVisuals
OUT=Path(__file__).parent
scene=trimesh.Scene()
materials={}
for name,col,rough,metal in [('shell','#e2e7f5',.32,.06),('panel','#d7ddec',.42,.02),('trim','#f2f5ff',.28,.04),('blue','#001aff',.25,.12),('gasket','#344053',.65,.05),('recess','#747f95',.48,.1),('steel','#a7b2c8',.3,.55)]:
 rgb=[int(col[i:i+2],16) for i in (1,3,5)]
 materials[name]=PBRMaterial(name=name,baseColorFactor=rgb+[255],metallicFactor=metal,roughnessFactor=rough,emissiveFactor=[0,.016,.12] if name=='blue' else [0,0,0])

def rounded(name,w,d,h,x=0,y=0,z=0,r=.05,b=.01,mat='shell'):
 # Z-up source, exported as glTF Y-up. Rounded plan corners and bevelled top/bottom.
 r=min(r,w/2-.0001,d/2-.0001); b=min(b,h*.48,r*.8)
 verts=[]; rings=[]; seg=4
 # offset of each ring from the largest outer contour
 for inset,zz in [(b,-h/2),(b*(1-math.sin(math.pi/6)),-h/2+b*(1-math.cos(math.pi/6))),(b*(1-math.sin(math.pi/3)),-h/2+b*(1-math.cos(math.pi/3))),(0,-h/2+b),(0,h/2-b),(b*(1-math.sin(math.pi/3)),h/2-b*(1-math.cos(math.pi/3))),(b*(1-math.sin(math.pi/6)),h/2-b*(1-math.cos(math.pi/6))),(b,h/2)]:
  ring=[]
  rr=r-inset
  for cx,cy,a in [(w/2-r,d/2-r,0),(-w/2+r,d/2-r,90),(-w/2+r,-d/2+r,180),(w/2-r,-d/2+r,270)]:
   for k in range(seg+1):
    angle=math.radians(a+90*k/seg)
    ring.append(len(verts));verts.append([cx+rr*math.cos(angle)+x,cy+rr*math.sin(angle)+y,zz+z])
  rings.append(ring)
 faces=[];n=len(rings[0])
 for j in range(len(rings)-1):
  for i in range(n):
   a,c=rings[j][i],rings[j][(i+1)%n];d1,e=rings[j+1][i],rings[j+1][(i+1)%n]
   faces.extend([[a,c,e],[a,e,d1]])
 # Separate cap vertices keep large planar surfaces flat.
 for ri,reverse in [(0,True),(-1,False)]:
  idx=[]
  for vi in rings[ri]:idx.append(len(verts));verts.append(verts[vi])
  center=len(verts);verts.append([x,y,z+(-h/2 if reverse else h/2)])
  for i in range(n):
   f=[center,idx[i],idx[(i+1)%n]];faces.append(f[::-1] if reverse else f)
 mesh=trimesh.Trimesh(vertices=verts,faces=faces,process=False)
 mesh.visual=TextureVisuals(material=materials[mat]);scene.add_geometry(mesh,node_name=name,geom_name=name)
 return mesh

def add(mesh,name,mat):
 mesh.visual=TextureVisuals(material=materials[mat]);scene.add_geometry(mesh,node_name=name,geom_name=name);return mesh

def rod(name,p1,p2,r,mat='steel',sections=24):
 return add(trimesh.creation.cylinder(radius=r,sections=sections,segment=np.array([p1,p2])),name,mat)

def upright(name,w,h,depth,x=0,y=0,z=0,r=.04,b=.008,mat='shell'):
 mesh=rounded(name,w,h,depth,r=r,b=b,mat=mat)
 transform=np.array([[1,0,0,x],[0,0,-1,y],[0,1,0,z],[0,0,0,1]],dtype=float)
 mesh.apply_transform(transform)
 return mesh


def leaf(name,angle,reach,rise,width,mat):
 angle=math.radians(angle);direction=np.array([math.cos(angle),math.sin(angle),0.]);side=np.array([-math.sin(angle),math.cos(angle),0.])
 verts=[[direction[0]*.006,direction[1]*.006,.087]];faces=[];rings=[];n=12
 for t in np.linspace(.045,.965,20):
  c=direction*(.006+reach*t**1.50);c[2]=.087+rise*(1-(1-t)**1.25)
  w=width*math.sin(math.pi*t)**1.05;thick=.0009*math.sin(math.pi*t)**.5
  ring=[]
  for j in range(n):
   a=2*math.pi*j/n;v=c+side*w*math.cos(a)
   v[2]+=.0045*math.sin(math.pi*t)*(1-math.cos(a)**2)+thick*math.sin(a)
   ring.append(len(verts));verts.append(v.tolist())
  rings.append(ring)
 for j in range(n):faces.append([0,rings[0][(j+1)%n],rings[0][j]])
 for low,high in zip(rings[:-1],rings[1:]):
  for j in range(n):
   k=(j+1)%n;faces.extend([[low[j],low[k],high[k]],[low[j],high[k],high[j]]])
 tip=direction*(.006+reach);tip[2]=.087+rise;idx=len(verts);verts.append(tip.tolist())
 for j in range(n):faces.append([rings[-1][j],rings[-1][(j+1)%n],idx])
 mesh=trimesh.Trimesh(vertices=verts,faces=faces,process=True);mesh.fix_normals();add(mesh,name,mat)

# All dimensions are meters. Build in Z-up, then export glTF Y-up.
def material(name,color,rough=.5,metal=.0,emit=None):
 materials[name]=PBRMaterial(name=name,baseColorFactor=color+[255],roughnessFactor=rough,metallicFactor=metal,emissiveFactor=emit or [0,0,0])
material('white',[235,242,255],.43);material('wall',[220,228,244],.72)
material('back',[219,225,237],.68);material('navy',[11,20,36],.57)
material('blue',[0,34,255],.37);material('softblue',[86,143,209],.56)
material('pale_blue',[169,195,237],.72);material('gray',[105,121,146],.64)
material('boardframe',[181,193,211],.48);material('paper',[247,250,255],.85);material('silver',[132,153,177],.3,.58)
material('wood',[114,61,25],.72);material('oak',[183,121,55],.7)
material('soil',[14,24,10],1);material('leaf0',[28,117,8],.66)
material('leaf1',[43,145,10],.66);material('leaf2',[19,92,5],.66)
material('leaf3',[54,153,12],.66);material('yellow',[246,212,66],.78)
material('peach',[246,167,98],.78);material('note_blue',[125,169,219],.78)
material('cyan_light',[77,211,255],.25,emit=[.08,.72,1.])
material('warm_light',[255,224,166],.45,emit=[1.,.62,.22])
material('lamp_ivory',[255,240,201],.48,emit=[.26,.17,.07])
material('shelf_warm_back',[240,226,200],.74,emit=[.05,.025,.006])

# Architectural assembly: wall, full-width cabinetry and side display towers.
upright('Wall_main_panel',4.80,2.70,.105,y=-.085,z=1.35,r=.045,b=.012,mat='wall')
rounded('Wall_top_header',4.88,.20,.095,y=-.025,z=2.67,r=.025,b=.012,mat='white')
rounded('Cabinet_full_body',4.66,.40,.625,y=.185,z=.3125,r=.018,b=.006,mat='white')
rounded('Cabinet_recessed_plinth',4.56,.335,.065,y=.155,z=.0325,r=.010,b=.004,mat='navy')
rounded('Countertop_white',4.76,.445,.038,y=.194,z=.661,r=.016,b=.007,mat='white')
rounded('Countertop_thin_oak_edge',4.72,.009,.009,y=.417,z=.645,r=.003,b=.002,mat='oak')
# Seven full-height cupboard fronts and a stack of drawers at the right.
for i in range(7):
 x=2.038-i*.565
 upright('Cabinet_door_'+str(i+1),.551,.522,.015,x=x,y=.393,z=.342,r=.006,b=.002,mat='white')
 hx=x+(.18 if i%2 else -.18)
 rod('Cabinet_handle_'+str(i+1),[hx,.410,.310],[hx,.410,.432],.006,'silver',sections=12)
for i in range(3):
 z=.166+i*.177
 upright('Cabinet_right_drawer_'+str(i+1),.654,.166,.016,x=-1.971,y=.394,z=z,r=.006,b=.002,mat='white')
 rod('Drawer_handle_'+str(i+1),[-2.041,.411,z+.022],[-1.901,.411,z+.022],.0055,'silver',sections=12)

for label,x in [('Left',1.835),('Right',-1.835)]:
 # Tower width .98, clear space .88, three display levels above the countertop.
 for side in [-1,1]:
  rounded(label+'_tower_side_'+str(side),.045,.365,1.958,x=x+side*.48,y=.144,z=1.662,r=.006,b=.003,mat='white')
 for i,z in enumerate([1.302,1.934,2.585]):
  rounded(label+'_shelf_'+str(i+1),.945,.375,.033,x=x,y=.151,z=z,r=.006,b=.003,mat='white')
 for i,(z,h) in enumerate([(.989,.588),(1.622,.589),(2.260,.593)]):
  upright(label+'_warm_cubby_back_'+str(i+1),.886,h,.004,x=x,y=-.028,z=z,r=.004,b=.001,mat='shelf_warm_back')
 for i,z in enumerate([1.279,1.911,2.562]):
  rounded(label+'_warm_under_shelf_LED_'+str(i+1),.870,.020,.007,x=x,y=.220,z=z,r=.003,b=.0015,mat='warm_light')
# Center wall light and cyan upper accent.
rounded('Center_top_cyan_light_frame',1.78,.110,.055,y=.053,z=2.542,r=.017,b=.006,mat='white')
rounded('Center_top_cyan_diffuser',1.68,.085,.018,y=.081,z=2.519,r=.009,b=.003,mat='cyan_light')
upright('Board_upper_white_light',1.99,.050,.038,y=.080,z=2.130,r=.024,b=.006,mat='paper')

# Wide central whiteboard with planning notes and a rising bar chart.
upright('Whiteboard_outer_bevel_frame',2.48,1.015,.050,y=.037,z=1.535,r=.045,b=.010,mat='boardframe')
upright('Whiteboard_white_face',2.425,.957,.017,y=.070,z=1.535,r=.034,b=.004,mat='paper')
rounded('Whiteboard_lower_pen_tray',2.40,.080,.024,y=.107,z=1.015,r=.007,b=.004,mat='white')
# Note layout uses readable shapes and short decorative line marks, no invented text.
notes=[(.943,1.865,'yellow'),(.670,1.865,'peach'),(.943,1.655,'yellow'),(.670,1.655,'note_blue'),(.943,1.445,'softblue'),(.670,1.445,'pale_blue'),(.285,1.865,'note_blue'),(.285,1.655,'note_blue'),(.285,1.445,'note_blue'),(.020,1.865,'note_blue'),(.020,1.655,'pale_blue')]
# Flow connectors sit behind the notes on the board face.
for k,(p1,p2) in enumerate([((.85,1.655),(.76,1.655)),((.58,1.655),(.38,1.655)),((.19,1.865),(.11,1.865)),((.285,1.77),(.285,1.75)),((.285,1.56),(.285,1.54)),((.020,1.77),(.020,1.75))]):
 rod('Board_flow_connector_'+str(k),[p1[0],.083,p1[1]],[p2[0],.083,p2[1]],.003,'gray',sections=8)
for i,(x,z,mat) in enumerate(notes):
 upright('Board_sticky_note_'+str(i+1),.142,.139,.004,x=x,y=.088,z=z,r=.006,b=.001,mat=mat)
 for j,w in enumerate([.073,.091,.055]):
  upright('Note_'+str(i+1)+'_mark_'+str(j),w,.003,.001,x=x+.009,y=.091,z=z+.034-j*.024,r=.001,b=.0002,mat='gray')
# Chart sheet on the right half, held by tiny corner pins.
upright('Board_chart_sheet',.695,.665,.003,x=-.787,y=.089,z=1.648,r=.005,b=.0007,mat='white')
for z in [1.387,1.505,1.623,1.741,1.859]:
 upright('Chart_grid_'+str(z),.580,.0016,.001,x=-.787,y=.091,z=z,r=.0005,b=.0002,mat='panel')
for i,h in enumerate([.105,.162,.235,.315,.410,.488]):
 x=-.539-i*.099
 upright('Chart_blue_bar_'+str(i+1),.061,h,.003,x=x,y=.094,z=1.385+h/2,r=.004,b=.0006,mat='softblue')
for x in [-1.112,-.461]:
 for z in [1.343,1.953]:rod('Chart_pin_'+str(x)+'_'+str(z),[x,.092,z],[x,.097,z],.004,'silver',sections=10)

# Shelf accessories, built at their final locations.
def box_prop(label,x,z,w=.20,h=.20,mat='softblue',y=.180,d=.22):
 rounded(label+'_body',w,d,h-.032,x=x,y=y,z=z+(h-.032)/2,r=.010,b=.004,mat=mat)
 rounded(label+'_lid',w+.011,d+.011,.032,x=x,y=y,z=z+h-.016,r=.010,b=.004,mat=mat)
 upright(label+'_dark_pull',w*.18,.024,.0015,x=x,y=y+d/2+.001,z=z+h*.66,r=.003,b=.0004,mat='navy')
 upright(label+'_index_label',w*.23,.024,.0015,x=x,y=y+d/2+.0015,z=z+h*.44,r=.002,b=.0004,mat='white' if mat!='white' else 'softblue')
for i,(x,mat) in enumerate([(-1.49,'softblue'),(-1.75,'white'),(-2.02,'softblue')]):box_prop('Right_top_box_'+str(i),x,1.952,.20,.21,mat)
for i,(x,mat) in enumerate([(-1.49,'white'),(-1.75,'softblue')]):box_prop('Right_mid_box_'+str(i),x,1.320,.21,.21,mat)
for i,x in enumerate([2.105,1.815]):box_prop('Left_low_box_'+str(i),x,.681,.224,.238,'white')

def book_group(label,x,z,count=5,green=True,y=.205,scale=1.):
 for i in range(count):
  xx=x+(i-(count-1)/2)*.040*scale;h=(.29+(i%3)*.022)*scale;w=.029*scale;d=.17*scale
  mat=['white','gray','pale_blue','white','softblue'][i%5]
  rounded(label+'_book_'+str(i),w,d,h,x=xx,y=y,z=z+h/2,r=.003,b=.001,mat=mat)
  upright(label+'_spine_label_'+str(i),w*.65,.043*scale,.001,x=xx,y=y+d/2+.001,z=z+h*.78,r=.001,b=.0003,mat='paper')
  upright(label+'_spine_rule_'+str(i),w*.66,.003,.001,x=xx,y=y+d/2+.001,z=z+h*.19,r=.0006,b=.0002,mat='silver')
book_group('Left_top_books',1.515,1.952,6,scale=.88)
book_group('Right_lower_books',-1.535,.681,5,scale=.88)
book_group('Center_right_dark_binders',-1.15,.681,3,scale=.70,y=.235)
# Make the center binders darker, like the screenshot.
for name,mesh in scene.geometry.items():
 if name.startswith('Center_right_dark_binders_book'):mesh.visual=TextureVisuals(material=materials['navy'])

# Printer on the right lower display shelf.
rounded('Printer_dark_base',.413,.267,.061,x=-2.024,y=.192,z=.7115,r=.018,b=.006,mat='navy')
rounded('Printer_main_white_body',.397,.252,.137,x=-2.024,y=.178,z=.7865,r=.025,b=.008,mat='white')
rounded('Printer_upper_paper_tray',.343,.223,.035,x=-2.024,y=.162,z=.8725,r=.016,b=.005,mat='paper')
upright('Printer_dark_output_slot',.301,.020,.003,x=-2.024,y=.306,z=.772,r=.004,b=.001,mat='navy')
rounded('Printer_output_tray',.305,.112,.013,x=-2.024,y=.325,z=.741,r=.008,b=.003,mat='gray')
rounded('Printer_small_blue_button',.017,.024,.003,x=-2.174,y=.185,z=.857,r=.005,b=.0007,mat='blue')

# Warm small dome lamps on the middle shelves.
def lamp(label,x,z):
 rounded(label+'_wood_base',.170,.115,.028,x=x,y=.213,z=z+.014,r=.025,b=.006,mat='wood')
 rod(label+'_wood_stem',[x,.213,z+.026],[x,.213,z+.126],.037,'oak',sections=20)
 profile=[(0,.225)]
 for angle in np.linspace(0,math.pi/2,13):
  profile.append((.126*math.sin(angle),.112+.113*math.cos(angle)))
 profile.extend([(0,.112),(0,.225)])
 mesh=trimesh.creation.revolve(np.array(profile),sections=40);mesh.fix_normals();mesh.apply_translation([x,.213,z]);add(mesh,label+'_ivory_dome','lamp_ivory')
lamp('Left_middle_lamp',1.69,1.320)
lamp('Right_middle_lamp',-2.075,1.320)

# White round pots and leafy green rosettes.
def round_pot(label,x,y,z,r=.066,h=.100):
 profile=[(0,0),(r*.78,0),(r*.91,.005),(r,h-.006),(r*.98,h),(r*.84,h),(r*.78,.014),(0,.014),(0,0)]
 mesh=trimesh.creation.revolve(np.array(profile),sections=32);mesh.fix_normals();mesh.apply_translation([x,y,z]);add(mesh,label+'_white_pot','white')
 rod(label+'_soil',[x,y,z+h-.012],[x,y,z+h-.008],r*.82,'soil',sections=24)
def rosette(label,x,y,z,scale=1.):
 round_pot(label,x,y,z,.065*scale,.100*scale)
 for i,(a,r,h,w) in enumerate([(15,.12,.13,.025),(80,.10,.16,.025),(150,.11,.13,.026),(220,.11,.14,.024),(290,.11,.13,.024),(45,.055,.20,.024),(135,.05,.18,.025),(260,.05,.19,.023)]):
  name=label+'_leaf_'+str(i);leaf(name,a,r,h,w,'leaf'+str(i%4))
  m=scene.geometry[name];m.apply_scale(scale);m.apply_translation([x,y,z+.011*scale])
rosette('Left_lower_green_plant',1.42,.192,.681,1.12)
# Compact planter in the middle-left cubby.
round_pot('Left_middle_small_plant',2.115,.190,1.320,.056,.095)
# Trailing foliage uses solid leaves grouped by green material for efficient rendering.
def vine_plant(label,x,y,z,spread=.18,drop=.48):
 round_pot(label,x,y,z,.065,.102)
 clusters=[[] for _ in range(4)]
 for k in range(3):
  points=[]
  for j in range(11):
   t=j/10;px=x+(k-1)*.049+.023*math.sin(t*8+k*2);py=y+.025+.125*t;pz=z+.134-drop*t*(.64+k*.18)
   points.append([px,py,pz])
   for side in [(-1 if (j+k)%2 else 1)]:
    mesh=trimesh.creation.icosphere(subdivisions=2,radius=1)
    mesh.apply_scale([.020,.008,.031]);mesh.apply_transform(trimesh.transformations.rotation_matrix(side*(.45+.24*math.sin(j)),[0,1,0]));mesh.apply_transform(trimesh.transformations.rotation_matrix(j*.7,[0,0,1]));mesh.apply_translation([px+side*.021,py,pz+.014])
    clusters[(j+k)%4].append(mesh)
  for j in range(10):rod(label+'_vine_'+str(k)+'_'+str(j),points[j],points[j+1],.0018,'leaf2',sections=6)
 for j in range(18):
  a=j*2.399;r=spread*math.sqrt((j+1)/18);mesh=trimesh.creation.icosphere(subdivisions=2,radius=1);mesh.apply_scale([.025,.012,.034]);mesh.apply_translation([x+r*math.cos(a),y+r*.5*math.sin(a),z+.13+.04*math.sin(j)])
  clusters[j%4].append(mesh)
 for i,parts in enumerate(clusters):add(trimesh.util.concatenate(parts),label+'_leaf_cluster_'+str(i),'leaf'+str(i))
vine_plant('Left_top_trailing_plant',2.065,.185,1.952,.14,.56)
vine_plant('Right_top_trailing_plant',-2.137,.180,1.952,.12,.46)
# Tiny upright plant at far left upper shelf.
round_pot('Left_top_mini_plant',2.220,.070,1.952,.035,.067)
for j in range(4):
 mesh=trimesh.creation.icosphere(subdivisions=1,radius=1);mesh.apply_scale([.027,.022,.038]);mesh.apply_translation([2.22+.012*math.sin(j),.07,2.04+j*.032]);add(mesh,'Mini_plant_leaf_'+str(j),'leaf1')

# Small objects on countertop and shelves: binders, pen holder and cup.
for i in range(2):
 x=1.055-i*.100
 rounded('Counter_blue_binder_'+str(i),.068,.156,.238,x=x,y=.230,z=.800,r=.005,b=.002,mat='blue')
 upright('Counter_binder_label_'+str(i),.030,.035,.0015,x=x,y=.309,z=.819,r=.002,b=.0004,mat='white')
# Minimal white pen cup with three thin pens.
rounded('Left_lower_pen_cup',.077,.077,.090,x=1.215,y=.210,z=.726,r=.009,b=.002,mat='navy')
for i,dx in enumerate([-.02,0,.022]):rod('Left_lower_pen_'+str(i),[1.215+dx,.210,.735],[1.215+dx*1.4,.210,.855+(i%2)*.025],.004,'gray',sections=10)
# Shelf decor blocks and coffee cup with saucer.
rounded('Left_middle_blue_decor',.106,.103,.140,x=2.115,y=.218,z=1.390,r=.009,b=.003,mat='softblue')
rod('Left_middle_saucer',[1.420,.253,1.322],[1.420,.253,1.331],.052,'paper',sections=24)
rod('Left_middle_cup',[1.420,.253,1.330],[1.420,.253,1.374],.029,'lamp_ivory',sections=24)
rod('Center_counter_small_cup',[-.935,.250,.681],[-.935,.250,.777],.035,'lamp_ivory',sections=24)
# Consolidate tiny vine stems into one mesh per plant, retaining main component names.
for prefix in ['Left_top_trailing_plant_vine','Right_top_trailing_plant_vine']:
 names=[n for n in scene.geometry if n.startswith(prefix)]
 combined=trimesh.util.concatenate([scene.geometry[n] for n in names])
 for n in names:scene.delete_geometry(n)
 add(combined,prefix+'_combined','leaf2')

# Consolidate each logical assembly by material to reduce draw calls.
def assembly_group(name):
 if name.startswith(('Wall_','Center_top_')):return 'Wall'
 if name.startswith(('Cabinet_','Countertop_','Drawer_')):return 'Cabinet'
 if name.startswith(('Whiteboard_','Board_','Note_','Chart_')):return 'Whiteboard'
 if name.startswith(('Left_','Mini_')):return 'Left_shelves_and_accessories'
 if name.startswith(('Right_','Printer_')):return 'Right_shelves_and_accessories'
 return 'Counter_accessories'
groups={}
for name,mesh in scene.geometry.items():
 mat=mesh.visual.material;key=(assembly_group(name),mat.name)
 groups.setdefault(key,[]).append(mesh)
optimized=trimesh.Scene()
for (group,material_name),meshes in groups.items():
 combined=trimesh.util.concatenate(meshes);name=group+'__'+material_name
 optimized.add_geometry(combined,node_name=name,geom_name=name)
scene=optimized

# Export a single GLB; front faces -Z, origin at wall bottom-center.
rot=trimesh.transformations.rotation_matrix(-math.pi/2,[1,0,0]);scene.apply_transform(rot)
for mesh in scene.geometry.values():_=mesh.vertex_normals
scene.metadata={'asset':'Nodeworks / Back wall with attached furnishings','status':'Reconstructed from one screenshot; not exact 1:1','units':'meter','up_axis':'Y','front':'-Z','origin':'wall bottom-center','rigged':False,'animation':False,'includes':['back wall','side shelves','lower cabinets','whiteboard','shelf accessories','integrated light materials'],'excluded':['floor','side glass walls','roof','office desks','chairs','people','floor plants']}
f=OUT/'nodeworks-back-wall-combined.glb';scene.export(str(f))
loaded=trimesh.load(f,force='scene')
report={'mesh_count':len(loaded.geometry),'triangles':sum(len(m.faces) for m in loaded.geometry.values()),'size_bytes':f.stat().st_size,'dimensions_m':loaded.extents.tolist(),'bounds':loaded.bounds.tolist(),'finite_vertices':all(np.isfinite(m.vertices).all() for m in loaded.geometry.values()),'valid_face_indices':all(m.faces.min()>=0 and m.faces.max()<len(m.vertices) for m in loaded.geometry.values()),'external_textures':False,'animation':False,'main_wall_size_m':[4.8,2.7,.105]}
assert report['finite_vertices'] and report['valid_face_indices']
(OUT/'validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
