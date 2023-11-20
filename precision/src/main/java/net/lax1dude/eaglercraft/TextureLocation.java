package net.lax1dude.eaglercraft;

import net.minecraft.client.Minecraft;
import net.minecraft.src.RenderEngine;

import java.util.ArrayList;

public class TextureLocation {

    private final String path;
    private int glObject;

    public TextureLocation(String path) {
        this.path = path;
        this.glObject = -1;
        locations.add(this);
    }

    public static void freeTextures() {
        for (TextureLocation l : locations) {
            l.glObject = -1;
        }
    }

    public void bindTexture() {
        RenderEngine r = Minecraft.getMinecraft().renderEngine;
        if (glObject == -1) {
            glObject = r.getTexture(path);
            if (glObject == -1) {
                System.err.println("could not load: " + path);
            }
        }
        r.bindTexture(glObject);
    }

    private static final ArrayList<TextureLocation> locations = new ArrayList();

}
